import { getComponentByTagName } from "../../components/config";
import { unRegistEvent } from "../event";
import Reconciler from "react-reconciler";

let id = 1;

export const getUid = () => {
  return String(id++);
};

const instanceMap = new Map();

export const getInstance = (uid) => {
  return instanceMap.get(uid);
};

const cleanupInstance = (child, { destroy } = { destroy: false }) => {
  if (!child) return;
  const uid = child.uid;
  if (uid) {
    unRegistEvent(uid);
    instanceMap.delete(uid);
  }
  // IMPORTANT:
  // For nested children, the native `parent.removeChild(child)` implementation may already
  // delete/detach the underlying LVGL object. Calling `child.close()` again can double-free/hang.
  // Only destroy on root-container removal where we own the lifetime explicitly.
  if (destroy && child.close) {
    child.close();
  }
};

const HostConfig = {
  now: Date.now,
  getPublicInstance: (instance) => {
    //for supporting refs
    return instance;
  },
  getRootHostContext: () => {
    let context = {
      name: "rootnode",
    };
    return context;
  },
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {
    return {};
  },
  shouldSetTextContent: function (type, props) {
    // Keep text as a prop for our `Text` host component, not as separate text children.
    if (type === "Text") {
      const c = props?.children;
      if (typeof c === "string" || typeof c === "number") return true;
      if (Array.isArray(c)) {
        return c.every((x) => typeof x === "string" || typeof x === "number");
      }
    }
    return false;
  },
  createInstance: (
    type,
    newProps,
    rootContainerInstance,
    _currentHostContext,
    workInProgress,
  ) => {
    const { createInstance } = getComponentByTagName(type);
    const uid = getUid();
    const instance = createInstance(
      newProps,
      rootContainerInstance,
      _currentHostContext,
      workInProgress,
      uid,
    );
    instanceMap.set(uid, instance);
    return instance;
  },
  createTextInstance: (
    text,
    rootContainerInstance,
    context,
    workInProgress,
  ) => {
    const { createInstance } = getComponentByTagName("Text");
    const uid = getUid();
    const instance = createInstance(
      { children: text },
      rootContainerInstance,
      context,
      workInProgress,
      uid,
    );
    instanceMap.set(uid, instance);
    return instance;
  },
  appendInitialChild: (parent, child) => {
    parent.appendChild(child);
  },
  appendChild(parent, child) {
    parent.appendChild(child);
  },
  finalizeInitialChildren: (yueElement, type, props) => {
    return true;
  },
  insertBefore: (parent, child, beforeChild) => {
    parent.insertBefore(child, beforeChild);
  },
  supportsMutation: true,
  appendChildToContainer: function (container, child) {
    container.add(child);
  },
  insertInContainerBefore: (container, child, beforeChild) => {
    container.insertBefore(child, beforeChild);
  },
  removeChildFromContainer: (container, child) => {
    container.delete(child);
    cleanupInstance(child, { destroy: true });
  },
  prepareUpdate(instance, oldProps, newProps) {
    return true;
  },
  commitUpdate: function (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    finishedWork,
  ) {
    const { commitUpdate } = getComponentByTagName(type);
    return commitUpdate(
      instance,
      updatePayload,
      oldProps,
      newProps,
      finishedWork,
    );
  },
  commitTextUpdate(textInstance, oldText, newText) {
    textInstance.setText(newText);
  },
  removeChild(parent, child) {
    parent?.removeChild(child);
    cleanupInstance(child, { destroy: false });
  },
  commitMount: function (instance, type, newProps, internalInstanceHandle) {
    const { commitMount } = getComponentByTagName(type);
    return commitMount(instance, newProps, internalInstanceHandle);
  },
};

export default Reconciler(HostConfig);
