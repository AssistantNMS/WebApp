export interface Tree<T> {
    item: T;
    children: Array<Tree<T>>;
}