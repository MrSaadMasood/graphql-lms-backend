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
  Date: { input: any; output: any; }
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

export type GetTestOptions = {
  academyName: Scalars['NonEmptyString']['input'];
  giveRandomTest?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  paperCategory: Scalars['NonEmptyString']['input'];
  paperSubject?: InputMaybe<Scalars['String']['input']>;
  paperYear?: InputMaybe<Scalars['Int']['input']>;
};

export type LoginUserInput = {
  email: Scalars['Email']['input'];
  password: Scalars['NonEmptyString']['input'];
};

export type McqSearchResult = {
  __typename?: 'MCQSearchResult';
  id: Scalars['Int']['output'];
  statement: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  BuyMoreTokens: RemainingTokens;
  ConsumeToken: RemainingTokens;
  DeleteTestMCQ: Scalars['Boolean']['output'];
  GoogleLogin: Tokens;
  LoginUser: Tokens;
  PurchaseOneTimeSubscription: Scalars['String']['output'];
  RefreshUser: AccessToken;
  SaveUserTestData: Scalars['Boolean']['output'];
  SignUpUser: Success;
  UpdateTestMCQ: Scalars['Boolean']['output'];
};


export type MutationConsumeTokenArgs = {
  isTestCompleted: Scalars['Boolean']['input'];
};


export type MutationDeleteTestMcqArgs = {
  id: Scalars['Int']['input'];
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


export type MutationSaveUserTestDataArgs = {
  input: UserTestDataInput;
};


export type MutationSignUpUserArgs = {
  input: CreateUserInput;
};


export type MutationUpdateTestMcqArgs = {
  input: UpdateMcqInput;
};

export type OverAllUserData = {
  __typename?: 'OverAllUserData';
  date?: Maybe<Scalars['Date']['output']>;
  total_correct: Scalars['Int']['output'];
  total_incorrect: Scalars['Int']['output'];
  total_solved: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  GetAllMCQBasedOnAcademy: Array<McqSearchResult>;
  GetSpecificMCQ: UpdateMcqOutput;
  GetTestBasedOnOptions: Array<TestDataSent>;
  GetUserData: SelectedUserData;
  GetUserPersonalTestData: UserPersonalTestData;
  SearchMCQBasedOnFilters: Array<McqSearchResult>;
  dummy?: Maybe<Scalars['String']['output']>;
};


export type QueryGetAllMcqBasedOnAcademyArgs = {
  academyName: Scalars['NonEmptyString']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryGetSpecificMcqArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetTestBasedOnOptionsArgs = {
  input: GetTestOptions;
};


export type QuerySearchMcqBasedOnFiltersArgs = {
  input: TestSearchFilters;
};


export type QueryDummyArgs = {
  id: Scalars['String']['input'];
};

export type RefreshUserInput = {
  login_method: Scalars['NonEmptyString']['input'];
  refreshToken: Scalars['NonEmptyString']['input'];
  role: Scalars['NonEmptyString']['input'];
};

export type RemainingTokens = {
  __typename?: 'RemainingTokens';
  remainingTokens: Scalars['Int']['output'];
};

export type SelectedUserData = {
  __typename?: 'SelectedUserData';
  free_tokens: Scalars['Int']['output'];
  full_name: Scalars['String']['output'];
  login_method: Scalars['String']['output'];
  role: Scalars['String']['output'];
  subscription_type: Scalars['String']['output'];
};

export type SubjectWiseUserData = {
  __typename?: 'SubjectWiseUserData';
  date?: Maybe<Scalars['Date']['output']>;
  subject: Scalars['String']['output'];
  total_correct: Scalars['Int']['output'];
  total_incorrect: Scalars['Int']['output'];
  total_solved: Scalars['Int']['output'];
};

export type Success = {
  __typename?: 'Success';
  isSuccess: Scalars['Boolean']['output'];
};

export type TestDataSent = {
  __typename?: 'TestDataSent';
  correct: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  explanation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  option_a: Scalars['String']['output'];
  option_b: Scalars['String']['output'];
  option_c: Scalars['String']['output'];
  paper_year: Scalars['Int']['output'];
  statement: Scalars['String']['output'];
  subject: Scalars['String']['output'];
};

export type TestSearchFilters = {
  academyName: Scalars['NonEmptyString']['input'];
  paperSubject?: InputMaybe<Scalars['String']['input']>;
  paperYear?: InputMaybe<Scalars['Int']['input']>;
  searchText: Scalars['NonEmptyString']['input'];
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken: Scalars['String']['output'];
  login_method: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type UpdateMcqInput = {
  correct: Scalars['NonEmptyString']['input'];
  difficulty: Scalars['NonEmptyString']['input'];
  explanation: Scalars['NonEmptyString']['input'];
  id: Scalars['Int']['input'];
  option_a: Scalars['NonEmptyString']['input'];
  option_b: Scalars['NonEmptyString']['input'];
  option_c: Scalars['NonEmptyString']['input'];
  paper_category: Scalars['NonEmptyString']['input'];
  paper_year: Scalars['Int']['input'];
  statement: Scalars['NonEmptyString']['input'];
  subject: Scalars['NonEmptyString']['input'];
};

export type UpdateMcqOutput = {
  __typename?: 'UpdateMCQOutput';
  correct: Scalars['String']['output'];
  difficulty: Scalars['String']['output'];
  explanation: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  option_a: Scalars['String']['output'];
  option_b: Scalars['String']['output'];
  option_c: Scalars['String']['output'];
  paper_category: Scalars['String']['output'];
  paper_year: Scalars['Int']['output'];
  statement: Scalars['String']['output'];
  subject: Scalars['String']['output'];
};

export type UserPersonalTestData = {
  __typename?: 'UserPersonalTestData';
  general: Array<OverAllUserData>;
  subjectWise: Array<SubjectWiseUserData>;
};

export type UserTestDataInput = {
  subject: Scalars['NonEmptyString']['input'];
  totalCorrect: Scalars['Int']['input'];
  totalSolved: Scalars['Int']['input'];
  totalWrong: Scalars['Int']['input'];
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
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  Email: ResolverTypeWrapper<Scalars['Email']['output']>;
  GetTestOptions: GetTestOptions;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginUserInput: LoginUserInput;
  MCQSearchResult: ResolverTypeWrapper<McqSearchResult>;
  Mutation: ResolverTypeWrapper<{}>;
  NonEmptyString: ResolverTypeWrapper<Scalars['NonEmptyString']['output']>;
  OverAllUserData: ResolverTypeWrapper<OverAllUserData>;
  Query: ResolverTypeWrapper<{}>;
  RefreshUserInput: RefreshUserInput;
  RemainingTokens: ResolverTypeWrapper<RemainingTokens>;
  SelectedUserData: ResolverTypeWrapper<SelectedUserData>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubjectWiseUserData: ResolverTypeWrapper<SubjectWiseUserData>;
  Success: ResolverTypeWrapper<Success>;
  TestDataSent: ResolverTypeWrapper<TestDataSent>;
  TestSearchFilters: TestSearchFilters;
  Tokens: ResolverTypeWrapper<Tokens>;
  UpdateMCQInput: UpdateMcqInput;
  UpdateMCQOutput: ResolverTypeWrapper<UpdateMcqOutput>;
  UserPersonalTestData: ResolverTypeWrapper<UserPersonalTestData>;
  UserTestDataInput: UserTestDataInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccessToken: AccessToken;
  Boolean: Scalars['Boolean']['output'];
  CreateUserInput: CreateUserInput;
  Date: Scalars['Date']['output'];
  Email: Scalars['Email']['output'];
  GetTestOptions: GetTestOptions;
  Int: Scalars['Int']['output'];
  LoginUserInput: LoginUserInput;
  MCQSearchResult: McqSearchResult;
  Mutation: {};
  NonEmptyString: Scalars['NonEmptyString']['output'];
  OverAllUserData: OverAllUserData;
  Query: {};
  RefreshUserInput: RefreshUserInput;
  RemainingTokens: RemainingTokens;
  SelectedUserData: SelectedUserData;
  String: Scalars['String']['output'];
  SubjectWiseUserData: SubjectWiseUserData;
  Success: Success;
  TestDataSent: TestDataSent;
  TestSearchFilters: TestSearchFilters;
  Tokens: Tokens;
  UpdateMCQInput: UpdateMcqInput;
  UpdateMCQOutput: UpdateMcqOutput;
  UserPersonalTestData: UserPersonalTestData;
  UserTestDataInput: UserTestDataInput;
};

export type AccessTokenResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccessToken'] = ResolversParentTypes['AccessToken']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface EmailScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Email'], any> {
  name: 'Email';
}

export type McqSearchResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['MCQSearchResult'] = ResolversParentTypes['MCQSearchResult']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  BuyMoreTokens?: Resolver<ResolversTypes['RemainingTokens'], ParentType, ContextType>;
  ConsumeToken?: Resolver<ResolversTypes['RemainingTokens'], ParentType, ContextType, RequireFields<MutationConsumeTokenArgs, 'isTestCompleted'>>;
  DeleteTestMCQ?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteTestMcqArgs, 'id'>>;
  GoogleLogin?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationGoogleLoginArgs, 'code'>>;
  LoginUser?: Resolver<ResolversTypes['Tokens'], ParentType, ContextType, RequireFields<MutationLoginUserArgs, 'input'>>;
  PurchaseOneTimeSubscription?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  RefreshUser?: Resolver<ResolversTypes['AccessToken'], ParentType, ContextType, RequireFields<MutationRefreshUserArgs, 'input'>>;
  SaveUserTestData?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSaveUserTestDataArgs, 'input'>>;
  SignUpUser?: Resolver<ResolversTypes['Success'], ParentType, ContextType, RequireFields<MutationSignUpUserArgs, 'input'>>;
  UpdateTestMCQ?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationUpdateTestMcqArgs, 'input'>>;
};

export interface NonEmptyStringScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['NonEmptyString'], any> {
  name: 'NonEmptyString';
}

export type OverAllUserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['OverAllUserData'] = ResolversParentTypes['OverAllUserData']> = {
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  total_correct?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_incorrect?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_solved?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  GetAllMCQBasedOnAcademy?: Resolver<Array<ResolversTypes['MCQSearchResult']>, ParentType, ContextType, RequireFields<QueryGetAllMcqBasedOnAcademyArgs, 'academyName' | 'offset'>>;
  GetSpecificMCQ?: Resolver<ResolversTypes['UpdateMCQOutput'], ParentType, ContextType, RequireFields<QueryGetSpecificMcqArgs, 'id'>>;
  GetTestBasedOnOptions?: Resolver<Array<ResolversTypes['TestDataSent']>, ParentType, ContextType, RequireFields<QueryGetTestBasedOnOptionsArgs, 'input'>>;
  GetUserData?: Resolver<ResolversTypes['SelectedUserData'], ParentType, ContextType>;
  GetUserPersonalTestData?: Resolver<ResolversTypes['UserPersonalTestData'], ParentType, ContextType>;
  SearchMCQBasedOnFilters?: Resolver<Array<ResolversTypes['MCQSearchResult']>, ParentType, ContextType, RequireFields<QuerySearchMcqBasedOnFiltersArgs, 'input'>>;
  dummy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType, RequireFields<QueryDummyArgs, 'id'>>;
};

export type RemainingTokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemainingTokens'] = ResolversParentTypes['RemainingTokens']> = {
  remainingTokens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SelectedUserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SelectedUserData'] = ResolversParentTypes['SelectedUserData']> = {
  free_tokens?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  full_name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  login_method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subscription_type?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubjectWiseUserDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubjectWiseUserData'] = ResolversParentTypes['SubjectWiseUserData']> = {
  date?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total_correct?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_incorrect?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total_solved?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SuccessResolvers<ContextType = any, ParentType extends ResolversParentTypes['Success'] = ResolversParentTypes['Success']> = {
  isSuccess?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TestDataSentResolvers<ContextType = any, ParentType extends ResolversParentTypes['TestDataSent'] = ResolversParentTypes['TestDataSent']> = {
  correct?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  option_a?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_b?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_c?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paper_year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TokensResolvers<ContextType = any, ParentType extends ResolversParentTypes['Tokens'] = ResolversParentTypes['Tokens']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  login_method?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  refreshToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  role?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UpdateMcqOutputResolvers<ContextType = any, ParentType extends ResolversParentTypes['UpdateMCQOutput'] = ResolversParentTypes['UpdateMCQOutput']> = {
  correct?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  difficulty?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  explanation?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  option_a?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_b?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  option_c?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paper_category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paper_year?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  statement?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  subject?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserPersonalTestDataResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserPersonalTestData'] = ResolversParentTypes['UserPersonalTestData']> = {
  general?: Resolver<Array<ResolversTypes['OverAllUserData']>, ParentType, ContextType>;
  subjectWise?: Resolver<Array<ResolversTypes['SubjectWiseUserData']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccessToken?: AccessTokenResolvers<ContextType>;
  Date?: GraphQLScalarType;
  Email?: GraphQLScalarType;
  MCQSearchResult?: McqSearchResultResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  NonEmptyString?: GraphQLScalarType;
  OverAllUserData?: OverAllUserDataResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemainingTokens?: RemainingTokensResolvers<ContextType>;
  SelectedUserData?: SelectedUserDataResolvers<ContextType>;
  SubjectWiseUserData?: SubjectWiseUserDataResolvers<ContextType>;
  Success?: SuccessResolvers<ContextType>;
  TestDataSent?: TestDataSentResolvers<ContextType>;
  Tokens?: TokensResolvers<ContextType>;
  UpdateMCQOutput?: UpdateMcqOutputResolvers<ContextType>;
  UserPersonalTestData?: UserPersonalTestDataResolvers<ContextType>;
};


export type Date = Scalars["Date"];
export type Email = Scalars["Email"];
export type NonEmptyString = Scalars["NonEmptyString"];