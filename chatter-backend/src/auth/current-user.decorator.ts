import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';

const getCurrentUserByContext = (context: ExecutionContext): User => {
  if (context.getType() === 'http') {
    return context.switchToHttp().getRequest().user;
  }
  if (context.getType<GqlContextType>() === 'graphql') {
    const gqlCtx = GqlExecutionContext.create(context).getContext();
    return (
      gqlCtx.req?.user || // queries/mutations
      gqlCtx.user // websocket (set in onConnect)
    );
  }
  return undefined;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);
