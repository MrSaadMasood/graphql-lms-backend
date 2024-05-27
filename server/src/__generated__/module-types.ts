/* eslint-disable */
import * as Types from './graphql';
import * as gm from 'graphql-modules';
export namespace QueryModule {
  interface DefinedFields {
    Success: 'isSuccess';
    AccessToken: 'accessToken';
    Tokens: 'accessToken' | 'refreshToken' | 'login_method' | 'role';
    Query: 'dummy';
    Mutation: 'SignUpUser' | 'LoginUser' | 'RefreshUser' | 'GoogleLogin';
  }

  interface DefinedInputFields {
    LoginUserInput: 'email' | 'password';
    CreateUserInput:
      | 'first_name'
      | 'last_name'
      | 'email'
      | 'password'
      | 'login_method';
    RefreshUserInput: 'refreshToken' | 'login_method' | 'role';
  }

  export type Success = Pick<Types.Success, DefinedFields['Success']>;
  export type AccessToken = Pick<
    Types.AccessToken,
    DefinedFields['AccessToken']
  >;
  export type Tokens = Pick<Types.Tokens, DefinedFields['Tokens']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type LoginUserInput = Pick<
    Types.LoginUserInput,
    DefinedInputFields['LoginUserInput']
  >;
  export type CreateUserInput = Pick<
    Types.CreateUserInput,
    DefinedInputFields['CreateUserInput']
  >;
  export type RefreshUserInput = Pick<
    Types.RefreshUserInput,
    DefinedInputFields['RefreshUserInput']
  >;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;

  export type Scalars = Pick<Types.Scalars, 'NonEmptyString' | 'Email'>;
  export type NonEmptyStringScalarConfig = Types.NonEmptyStringScalarConfig;
  export type EmailScalarConfig = Types.EmailScalarConfig;

  export type SuccessResolvers = Pick<
    Types.SuccessResolvers,
    DefinedFields['Success'] | '__isTypeOf'
  >;
  export type AccessTokenResolvers = Pick<
    Types.AccessTokenResolvers,
    DefinedFields['AccessToken'] | '__isTypeOf'
  >;
  export type TokensResolvers = Pick<
    Types.TokensResolvers,
    DefinedFields['Tokens'] | '__isTypeOf'
  >;
  export type QueryResolvers = Pick<
    Types.QueryResolvers,
    DefinedFields['Query']
  >;
  export type MutationResolvers = Pick<
    Types.MutationResolvers,
    DefinedFields['Mutation']
  >;

  export interface Resolvers {
    Success?: SuccessResolvers;
    AccessToken?: AccessTokenResolvers;
    Tokens?: TokensResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    NonEmptyString?: Types.Resolvers['NonEmptyString'];
    Email?: Types.Resolvers['Email'];
  }

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    Success?: {
      '*'?: gm.Middleware[];
      isSuccess?: gm.Middleware[];
    };
    AccessToken?: {
      '*'?: gm.Middleware[];
      accessToken?: gm.Middleware[];
    };
    Tokens?: {
      '*'?: gm.Middleware[];
      accessToken?: gm.Middleware[];
      refreshToken?: gm.Middleware[];
      login_method?: gm.Middleware[];
      role?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      dummy?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      SignUpUser?: gm.Middleware[];
      LoginUser?: gm.Middleware[];
      RefreshUser?: gm.Middleware[];
      GoogleLogin?: gm.Middleware[];
    };
  }
}
