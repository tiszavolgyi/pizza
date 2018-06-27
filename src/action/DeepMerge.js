export default class DeepMerge {
  static merge(target, source) {
    for (let key of Object.keys(source)) {
      if (source[key] instanceof Object) Object.assign(source[key], DeepMerge.merge(target[key], source[key]))
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source)
    return target
  }
}