import errorTypes from "../types/error-types";
import type { ParameterizedContext } from "koa";

const errorHandler = (err: Error, ctx: ParameterizedContext) => {
  let status: number, message: string;
  switch (err.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400;
      message = "用户名或者密码不能为空";
      break;
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409;
      message = "用户名已存在";
      break;
    case errorTypes.NO_SUCH_USER:
      status = 400;
      message = "用户名不存在";
      break;
    case errorTypes.USER_OR_PASSWORD_INCONSISTENT:
      status = 400;
      message = "用户名或密码错误";
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401;
      message = "token无效";
      break;
    case errorTypes.CONFLICT:
      status = 409;
      message = "操作失败";
      break;
    default:
      status = 404;
      message = "Not Found";
      break;
  }
  ctx.status = status;
  ctx.body = message;
};

export default errorHandler;
