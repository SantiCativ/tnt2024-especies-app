/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(tabs)` | `/(tabs)/` | `/(tabs)/report` | `/..\src\components\auth\AuthDivider` | `/..\src\components\auth\AuthFormInput` | `/..\src\components\auth\AuthTerms` | `/..\src\components\auth\authStyles` | `/..\src\hooks\useGallery` | `/_sitemap` | `/login` | `/register` | `/report`;
      DynamicRoutes: `/especie/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/especie/[especieId]`;
    }
  }
}
