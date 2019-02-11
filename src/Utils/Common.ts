export const spy = (msg:String, a:any) => {
  console.log(msg, a)
  return a
}

export const logger = (...args:any[]) => {
  console.log(args[0], args.splice(1).join(""))
}