export type UpdatePayload<Props = any> = Partial<Props> | null;

export function diffProps<Props extends Record<string, any>>(
  oldProps: Props,
  newProps: Props,
  skipKeys: string[]
): UpdatePayload<Props> {
  const updatePayload: Partial<Props> = {};
  
  for (const key in newProps) {
    if (skipKeys.includes(key)) {
      continue;
    }
    
    const oldValue = oldProps[key];
    const newValue = newProps[key];
    
    if (hasChanged(oldValue, newValue)) {
      updatePayload[key as keyof Props] = newValue; 
    }
  }
  
  return Object.keys(updatePayload).length > 0 ? updatePayload : null;
}

function hasChanged(oldValue: any, newValue: any): boolean {
  if (Object.is(oldValue, newValue) || (oldValue == null && newValue == null)) {
    return false;
  }

  if ((oldValue == null || newValue == null) || (typeof oldValue !== typeof newValue))  {
    return true;
  }
  
  if (typeof oldValue === 'function') {
    return oldValue !== newValue;
  }
  
  if (Array.isArray(oldValue) && Array.isArray(newValue)) {
    return hasArrayChanged(oldValue, newValue);
  }
  
  if (typeof oldValue === 'object') {
    return hasObjectChanged(oldValue, newValue);
  }
  
  return true;
}

function hasArrayChanged(oldArray: any[], newArray: any[]): boolean {
  if (oldArray.length !== newArray.length) {
    return true;
  }
  
  for (let i = 0; i < oldArray.length; i++) {
    if (!Object.is(oldArray[i], newArray[i])) {
      return true;
    }
  }
  
  return false;
}

function hasObjectChanged(oldObj: Record<string, any>, newObj: Record<string, any>): boolean {
  const oldKeys = Object.keys(oldObj);
  const newKeys = Object.keys(newObj);
  
  if (oldKeys.length !== newKeys.length) {
    return true;
  }
  
  for (const key of oldKeys) {
    if (!(key in newObj)) {
      return true;
    }
    
    if (!Object.is(oldObj[key], newObj[key])) {
      return true;
    }
  }
  
  return false;
}