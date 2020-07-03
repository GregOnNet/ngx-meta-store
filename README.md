# ngx-meta-store

This is an attempt to build a feature-driven and very opinionated state management solution.
It starts being Angular related since I have most experience with this ecosystem.
Howerver, it might be possible to extract a core that applies to other librarys as well

## Goals
> Application Developers first

A simple API should be created that delivers a lot of benefits to the developer.
Things like progress-state, network-state and url-state should be absstracted away.

The framework should be progressive:
- local state
  - single object
  - collection
- remote state
  - handle side effects
- services communicating with each other

## Requirements

- It should handle optimistic/pesimistic updates running a side effect (aka API Call)
- It should deliver Status-Information about a side effect (Loading-State, Errors)
- It should handle network-connectivity implications
- It should separate Read and Write-Operations.
- It should generate the Statemanagement on top of a class representing an entity
- It should provide a query API loading related entities
- It should handle language switches
- It should be possible to filter data on client (with memoization)- & server-side
- It should know about loading state of the respective model (isInitialized, isLoading, isLoaded)
- It should be capable of aggregating all loading states to tell if the app is busy or not
- It should track errors of occurring in side-effects
- It should use immutable operations updating state locally
- It should allow caching data In-Memory
- It should allow caching/restoring data in/from browser storage
- It should track changes of an object and persist them (unit of work)
- It should provide a DebugContext logging all operation opening the gate for Developer Tools
- It should allow resetting parts of the state if the user is not authenticated anymore

## Sources

- https://svn.apache.org/repos/asf/zest/site/content/java/2.0/intro.html
- https://svn.apache.org/repos/asf/zest/site/content/java/2.0/thirty-minutes-intro.html
- https://restfulapi.net/resource-naming/
- https://en.wikipedia.org/wiki/Data,_context_and_interaction
- https://dzone.com/articles/implementing-dci-qi4j
- https://www.youtube.com/watch?v=U6wFqbkIaQY
- https://www.youtube.com/watch?v=SxHqhDT9WGI


## API Draft
> Non of the information below is final.
> Currently I am banging my head around a lot of stuff (see requirements)
> Help is very appreciated.
> https://gist.github.com/GregOnNet/54dbc1f781ecdd2e6bae0640889a657b

```ts
MetaStoreModule.configure({
  apiEndpoint: '/api',
  observers: {
    langauge: LanguageStateObserver,
    network: NetworkStateObserver,
    url: UrlStateObserver,
    auth: AuthenticationObserver;
  }
})

export interface MetaModel<TModel> {
  modelName: string
  identifier: keyof TModel;
}

export interface MetaModelBehaviourOptions {
  relaodOnLanguageChange: boolean;          // default true
  useOptimisticUpdates: boolean;            // default true
  clearLocalCacheAfterLoggingOut: boolean;  // default true
}

export abstract class MetaStore<TModel, TMetaModel extends MetaModel<TModel>> {
  connect(model: TMetaModel, options: MetaModelBehaviourOptions): Observable<TMetaModel[]>;
  
  filter(predicate: MetaPredicate<TMetaModel>): void;
 
  create(model: TMetaModel): void;
  update(model: TMetaModel): void;
  upsert(model: TMetaModel): void;
  delete(model: TMetaModel): void;
}

export class CustomerService extends MetaStore<Customer> {}

export interface AuthenticationObserver {
  authenticationStatusChange: Observable<AuthenticationState>;
}
```

### Usage

```ts
@Injectable({ providedIn: 'root' })
export class TaskApi extends MetaApi<Task>{
  register(): MetaApiRegistration {
    return {
      
    }
  }
}

export class Task {
  guid: Guid;
  title: Title;
  text: Text;
}

class Guid extends ValueObject {
  private _value: string;
  
  get value() { return this._value; }
  
  constructor(guid: string) {
    // validate guid
    // set _value
  }
}
```
