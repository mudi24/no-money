type RecordItem = {
  tags: Tag[];
  notes: string;
  type: string;
  amount: number;
  createdAt?: string;
  // createdAt?: Date; // TS 还可以写类(构造函数)
};
type Tag = {
  name: string,
  value: string
}
type TagListModel = {
  data: Tag[]
  fetch: () => Tag[]
  create: (name: string) => 'success' | 'duplicated' | 'label cannot be empty'  // 联合类型
  update: (id: string, name: string) => 'success' | 'duplicated' | 'not found'
  save: () => void
  remove: (id: string) => boolean
}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
  createRecordError: Error | null,
  createTagError: Error | null,
}
interface Window {

}