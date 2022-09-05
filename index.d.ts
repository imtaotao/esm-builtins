interface Options {
  version?: string;
  experimental?: boolean;
}
type builtinsFunction = (options: Options) => Array<string>;
export default builtinsFunction;