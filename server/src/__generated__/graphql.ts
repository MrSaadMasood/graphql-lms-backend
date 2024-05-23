/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Email: { input: any; output: any; }
  NonEmptyString: { input: any; output: any; }
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken: Scalars['String']['output'];
};

export type CreateUserInput = {
  email: Scalars['Email']['input'];
  first_name: Scalars['NonEmptyString']['input'];
  last_name: Scalars['NonEmptyString']['input'];
  login_method: Scalars['NonEmptyString']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type LoginUserInput = {
  email: Scalars['Email']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  GoogleLogin: Tokens;
  LoginUser: Tokens;
  RefreshUser: AccessToken;
  SignUpUser: Success;
};


export type MutationGoogleLoginArgs = {
  code: Scalars['NonEmptyString']['input'];
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRefreshUserArgs = {
  input: RefreshUserInput;
};


export type MutationSignUpUserArgs = {
  input: CreateUserInput;
};

export type Query = {
  __typename?: 'Query';
  dummy?: Maybe<Scalars['String']['output']>;
};


export type QueryDummyArgs = {
  id: Scalars['String']['input'];
};

export type RefreshUserInput = {
  login_method: Scalars['NonEmptyString']['input'];
  refreshToken: Scalars['NonEmptyString']['input'];
  role: Scalars['NonEmptyString']['input'];
};

export type Success = {
  __typename?: 'Success';
  isSuccess: Scalars['Boolean']['output'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  login_method: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: Scalars['String']['output'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccessToken: ResolverTypeWrapper<AccessToken>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CreateUserInput: CreateUserInput;
  Email: ResolverTypeWrapper<Scalars['Email']['output']>;
  LoginUserInput: LoginUserInput;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  Query: ResolverTypeWrapper<{}>;
  RefreshUserInput: RefreshUserInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Success: ResolverTypeWrapper<Success>;
  Tokens: ResolverTypeWrapper<Tokens>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessToken: AccessToken;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  Email: Scalars['Email']['output'];
  LoginUserInput: LoginUserInput;
  Mutation: {};
  NonEmptyString: Scalars['NonEmptyString']['output'];
  Query: {};
  RefreshUserInput: RefreshUserInput;
  String: Scalars['String']['output'];
  Success: Success;
  Tokens: Tokens;
};

export type AccessTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  GoogleLogin?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationGoogleLoginArgs, 'code'>>;
  LoginUser?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  RefreshUser?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<MutationRefreshUserArgs, 'input'>>;
  SignUpUser?: Resolver<ResolversTypes['Success'], ParentType, ContextType, RequireFields<MutationSignUpUserArgs, 'input'>>;
};

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryDummyArgs, 'id'>>;
};

export type SuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  login_method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessToken?: AccessTokenResolvers<ContextType>;
  Email?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
};


export type Email = Scalars["Email"];
export type NonEmptyString = Scalars["NonEmptyString"];