export function memoize( fn ) {
  return function () {
    let args = Array.prototype.slice.call(arguments),
        hash = "",
        i = args.length
    currentArg = null
    while (i--) {
      currentArg = args[i]
      hash += (currentArg === Object(currentArg)) ? JSON.stringify(currentArg) : currentArg
      fn.memoize || (fn.memoize = {})
    }
    return (hash in fn.memoize) ? fn.memoize[hash] : fn.memoize[hash] = fn.apply(this, args)
  }
}
