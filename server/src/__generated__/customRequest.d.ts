import { Request } from "express"
import { UserContext } from "./types"

interface CustomRequest extends Request {
  user?: UserContext
}
