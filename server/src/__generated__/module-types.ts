/* eslint-disable */
import * as Types from "./graphql";
import * as gm from "graphql-modules";
export namespace QueryModule {
  interface DefinedFields {
    UpdateMCQOutput: 'id' | 'statement' | 'option_a' | 'option_b' | 'option_c' | 'correct' | 'explanation' | 'subject' | 'paper_year' | 'paper_category' | 'difficulty';
    MCQSearchResult: 'id' | 'statement';
    Query: 'SearchMCQBasedOnFilters' | 'GetSpecificMCQ' | 'GetAllMCQBasedOnAcademy' | 'dummy' | 'GetUserData' | 'GetTestBasedOnOptions' | 'GetUserPersonalTestData';
    Mutation: 'UpdateTestMCQ' | 'DeleteTestMCQ' | 'SignUpUser' | 'LoginUser' | 'RefreshUser' | 'GoogleLogin' | 'ConsumeToken' | 'BuyMoreTokens' | 'SaveUserTestData';
    Success: 'isSuccess';
    AccessToken: 'accessToken';
    Tokens: 'accessToken' | 'refreshToken' | 'login_method' | 'role';
    RemainingTokens: 'remainingTokens';
    SelectedUserData: 'role' | 'login_method' | 'free_tokens' | 'full_name' | 'subscription_type';
    TestDataSent: 'id' | 'statement' | 'option_a' | 'option_b' | 'option_c' | 'correct' | 'explanation' | 'difficulty' | 'paper_year' | 'subject';
    OverAllUserData: 'total_solved' | 'total_correct' | 'total_incorrect' | 'date';
    SubjectWiseUserData: 'subject' | 'total_solved' | 'total_correct' | 'total_incorrect' | 'date';
    UserPersonalTestData: 'general' | 'subjectWise';
  };

  interface DefinedInputFields {
    TestSearchFilters: 'paperYear' | 'searchText' | 'paperSubject' | 'academyName';
    UpdateMCQInput: 'id' | 'statement' | 'option_a' | 'option_b' | 'option_c' | 'correct' | 'explanation' | 'subject' | 'paper_year' | 'paper_category' | 'difficulty';
    LoginUserInput: 'email' | 'password';
    CreateUserInput: 'first_name' | 'last_name' | 'email' | 'password' | 'login_method';
    RefreshUserInput: 'refreshToken' | 'login_method' | 'role';
    GetTestOptions: 'paperCategory' | 'academyName' | 'paperYear' | 'paperSubject' | 'giveRandomTest' | 'limit';
    UserTestDataInput: 'totalSolved' | 'totalCorrect' | 'totalWrong' | 'subject';
  };

  export type TestSearchFilters = Pick<Types.TestSearchFilters, DefinedInputFields['TestSearchFilters']>;
  export type UpdateMCQOutput = Pick<Types.UpdateMcqOutput, DefinedFields['UpdateMCQOutput']>;
  export type UpdateMCQInput = Pick<Types.UpdateMcqInput, DefinedInputFields['UpdateMCQInput']>;
  export type MCQSearchResult = Pick<Types.McqSearchResult, DefinedFields['MCQSearchResult']>;
  export type Query = Pick<Types.Query, DefinedFields['Query']>;
  export type Mutation = Pick<Types.Mutation, DefinedFields['Mutation']>;
  export type Success = Pick<Types.Success, DefinedFields['Success']>;
  export type AccessToken = Pick<Types.AccessToken, DefinedFields['AccessToken']>;
  export type Tokens = Pick<Types.Tokens, DefinedFields['Tokens']>;
  export type LoginUserInput = Pick<Types.LoginUserInput, DefinedInputFields['LoginUserInput']>;
  export type CreateUserInput = Pick<Types.CreateUserInput, DefinedInputFields['CreateUserInput']>;
  export type RefreshUserInput = Pick<Types.RefreshUserInput, DefinedInputFields['RefreshUserInput']>;
  export type RemainingTokens = Pick<Types.RemainingTokens, DefinedFields['RemainingTokens']>;
  export type SelectedUserData = Pick<Types.SelectedUserData, DefinedFields['SelectedUserData']>;
  export type GetTestOptions = Pick<Types.GetTestOptions, DefinedInputFields['GetTestOptions']>;
  export type TestDataSent = Pick<Types.TestDataSent, DefinedFields['TestDataSent']>;
  export type OverAllUserData = Pick<Types.OverAllUserData, DefinedFields['OverAllUserData']>;
  export type SubjectWiseUserData = Pick<Types.SubjectWiseUserData, DefinedFields['SubjectWiseUserData']>;
  export type UserPersonalTestData = Pick<Types.UserPersonalTestData, DefinedFields['UserPersonalTestData']>;
  export type UserTestDataInput = Pick<Types.UserTestDataInput, DefinedInputFields['UserTestDataInput']>;

  export type Scalars = Pick<Types.Scalars, 'NonEmptyString' | 'Email' | 'Date'>;
  export type NonEmptyStringScalarConfig = Types.NonEmptyStringScalarConfig;
  export type EmailScalarConfig = Types.EmailScalarConfig;
  export type DateScalarConfig = Types.DateScalarConfig;

  export type UpdateMCQOutputResolvers = Pick<Types.UpdateMcqOutputResolvers, DefinedFields['UpdateMCQOutput'] | '__isTypeOf'>;
  export type MCQSearchResultResolvers = Pick<Types.McqSearchResultResolvers, DefinedFields['MCQSearchResult'] | '__isTypeOf'>;
  export type QueryResolvers = Pick<Types.QueryResolvers, DefinedFields['Query']>;
  export type MutationResolvers = Pick<Types.MutationResolvers, DefinedFields['Mutation']>;
  export type SuccessResolvers = Pick<Types.SuccessResolvers, DefinedFields['Success'] | '__isTypeOf'>;
  export type AccessTokenResolvers = Pick<Types.AccessTokenResolvers, DefinedFields['AccessToken'] | '__isTypeOf'>;
  export type TokensResolvers = Pick<Types.TokensResolvers, DefinedFields['Tokens'] | '__isTypeOf'>;
  export type RemainingTokensResolvers = Pick<Types.RemainingTokensResolvers, DefinedFields['RemainingTokens'] | '__isTypeOf'>;
  export type SelectedUserDataResolvers = Pick<Types.SelectedUserDataResolvers, DefinedFields['SelectedUserData'] | '__isTypeOf'>;
  export type TestDataSentResolvers = Pick<Types.TestDataSentResolvers, DefinedFields['TestDataSent'] | '__isTypeOf'>;
  export type OverAllUserDataResolvers = Pick<Types.OverAllUserDataResolvers, DefinedFields['OverAllUserData'] | '__isTypeOf'>;
  export type SubjectWiseUserDataResolvers = Pick<Types.SubjectWiseUserDataResolvers, DefinedFields['SubjectWiseUserData'] | '__isTypeOf'>;
  export type UserPersonalTestDataResolvers = Pick<Types.UserPersonalTestDataResolvers, DefinedFields['UserPersonalTestData'] | '__isTypeOf'>;

  export interface Resolvers {
    UpdateMCQOutput?: UpdateMCQOutputResolvers;
    MCQSearchResult?: MCQSearchResultResolvers;
    Query?: QueryResolvers;
    Mutation?: MutationResolvers;
    Success?: SuccessResolvers;
    AccessToken?: AccessTokenResolvers;
    Tokens?: TokensResolvers;
    RemainingTokens?: RemainingTokensResolvers;
    SelectedUserData?: SelectedUserDataResolvers;
    TestDataSent?: TestDataSentResolvers;
    OverAllUserData?: OverAllUserDataResolvers;
    SubjectWiseUserData?: SubjectWiseUserDataResolvers;
    UserPersonalTestData?: UserPersonalTestDataResolvers;
    NonEmptyString?: Types.Resolvers['NonEmptyString'];
    Email?: Types.Resolvers['Email'];
    Date?: Types.Resolvers['Date'];
  };

  export interface MiddlewareMap {
    '*'?: {
      '*'?: gm.Middleware[];
    };
    UpdateMCQOutput?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      statement?: gm.Middleware[];
      option_a?: gm.Middleware[];
      option_b?: gm.Middleware[];
      option_c?: gm.Middleware[];
      correct?: gm.Middleware[];
      explanation?: gm.Middleware[];
      subject?: gm.Middleware[];
      paper_year?: gm.Middleware[];
      paper_category?: gm.Middleware[];
      difficulty?: gm.Middleware[];
    };
    MCQSearchResult?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      statement?: gm.Middleware[];
    };
    Query?: {
      '*'?: gm.Middleware[];
      SearchMCQBasedOnFilters?: gm.Middleware[];
      GetSpecificMCQ?: gm.Middleware[];
      GetAllMCQBasedOnAcademy?: gm.Middleware[];
      dummy?: gm.Middleware[];
      GetUserData?: gm.Middleware[];
      GetTestBasedOnOptions?: gm.Middleware[];
      GetUserPersonalTestData?: gm.Middleware[];
    };
    Mutation?: {
      '*'?: gm.Middleware[];
      UpdateTestMCQ?: gm.Middleware[];
      DeleteTestMCQ?: gm.Middleware[];
      SignUpUser?: gm.Middleware[];
      LoginUser?: gm.Middleware[];
      RefreshUser?: gm.Middleware[];
      GoogleLogin?: gm.Middleware[];
      ConsumeToken?: gm.Middleware[];
      BuyMoreTokens?: gm.Middleware[];
      SaveUserTestData?: gm.Middleware[];
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
    RemainingTokens?: {
      '*'?: gm.Middleware[];
      remainingTokens?: gm.Middleware[];
    };
    SelectedUserData?: {
      '*'?: gm.Middleware[];
      role?: gm.Middleware[];
      login_method?: gm.Middleware[];
      free_tokens?: gm.Middleware[];
      full_name?: gm.Middleware[];
      subscription_type?: gm.Middleware[];
    };
    TestDataSent?: {
      '*'?: gm.Middleware[];
      id?: gm.Middleware[];
      statement?: gm.Middleware[];
      option_a?: gm.Middleware[];
      option_b?: gm.Middleware[];
      option_c?: gm.Middleware[];
      correct?: gm.Middleware[];
      explanation?: gm.Middleware[];
      difficulty?: gm.Middleware[];
      paper_year?: gm.Middleware[];
      subject?: gm.Middleware[];
    };
    OverAllUserData?: {
      '*'?: gm.Middleware[];
      total_solved?: gm.Middleware[];
      total_correct?: gm.Middleware[];
      total_incorrect?: gm.Middleware[];
      date?: gm.Middleware[];
    };
    SubjectWiseUserData?: {
      '*'?: gm.Middleware[];
      subject?: gm.Middleware[];
      total_solved?: gm.Middleware[];
      total_correct?: gm.Middleware[];
      total_incorrect?: gm.Middleware[];
      date?: gm.Middleware[];
    };
    UserPersonalTestData?: {
      '*'?: gm.Middleware[];
      general?: gm.Middleware[];
      subjectWise?: gm.Middleware[];
    };
  };
}
