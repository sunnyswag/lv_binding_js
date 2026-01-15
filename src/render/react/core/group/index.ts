export const AddChildToDefGroup = Symbol.for('AddChildToDefGroup');
export const AddCurToDefGroup = Symbol.for('AddCurToDefGroup');

export type AddToDefGroupType = typeof AddChildToDefGroup | typeof AddCurToDefGroup;

export function toNativeInGroupType(g?: AddToDefGroupType): 0 | 1 | undefined {
  if (g === AddChildToDefGroup) return 0;
  if (g === AddCurToDefGroup) return 1;
  return undefined;
}

