/*
{
    defaultAccess: { list: true, field: true, custom: true },
    auth: { User: { password: [PasswordAuthStrategy] } },
    lists: {
      Product: List {
        key: 'Product',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      },
      ProductImage: List {
        key: 'ProductImage',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      },
      User: List {
        key: 'User',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      }
    },
    listsArray: [
      List {
        key: 'Product',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      },
      List {
        key: 'ProductImage',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      },
      List {
        key: 'User',
        _fields: [Object],
        _hooks: {},
        schemaDoc: undefined,
        adminDoc: undefined,
        adminConfig: [Object],
        labelResolver: [Function (anonymous)],
        isAuxList: false,
        getListByKey: [Function (anonymous)],
        defaultAccess: [Object],
        adminUILabels: [Object],
        gqlNames: [Object],
        adapterName: 'mongoose',
        adapter: [MongooseListAdapter],
        _schemaNames: [Array],
        access: [Object],
        queryLimits: [Object],
        cacheHint: undefined,
        createAuxList: [Function (anonymous)],
        fieldsInitialised: true,
        fieldsByPath: [Object],
        fields: [Array],
        views: [Object],
        hookManager: [HookManager]
      }
    ],
    getListByKey: [Function (anonymous)],
    _schemas: {
      internal: GraphQLSchema {
        __validationErrors: [],
        description: undefined,
        extensions: undefined,
        astNode: undefined,
        extensionASTNodes: [],
        _queryType: Query,
        _mutationType: Mutation,
        _subscriptionType: undefined,
        _directives: [Array],
        _typeMap: [Object: null prototype],
        _subTypeMap: [Object: null prototype] {},
        _implementationsMap: [Object: null prototype] {}
      },
      public: GraphQLSchema {
        __validationErrors: [],
        description: undefined,
        extensions: undefined,
        astNode: undefined,
        extensionASTNodes: [],
        _queryType: Query,
        _mutationType: Mutation,
        _subscriptionType: undefined,
        _directives: [Array],
        _typeMap: [Object: null prototype],
        _subTypeMap: [Object: null prototype] {},
        _implementationsMap: [Object: null prototype] {}
      }
    },
    _sessionManager: SessionManager {
      _cookieSecret: 'cookieACVyKjbCYMTl0bycACVyKjbCYMTl0byc',
      _cookie: { maxAge: 31104000, secure: false },
      _sessionStore: undefined
    },
    eventHandlers: { onConnect: [Function (anonymous)] },
    registeredTypes: Set(8) {
      {
        type: 'Text',
        implementation: [class Text extends Field],
        views: [Object],
        adapters: [Object]
      },
      {
        type: 'Wysiwyg',
        implementation: [class WysiwygImplementation extends Text],
        views: [Object],
        adapters: [Object],
        prepareMiddleware: [Function: prepareMiddleware]
      },
      {
        type: 'Relationship',
        isRelationship: true,
        implementation: [class Relationship extends Field],
        views: [Object],
        adapters: [Object]
      },
      {
        type: 'Select',
        implementation: [class Select extends Field],
        views: [Object],
        adapters: [Object]
      },
      {
        type: 'Integer',
        implementation: [class Integer extends Field],
        views: [Object],
        adapters: [Object]
      },
      {
        type: 'CloudinaryImage',
        implementation: [class CloudinaryImage$1 extends File],
        views: [Object],
        adapters: [Object],
        blocks: [Object]
      },
      {
        type: 'Checkbox',
        implementation: [class Checkbox extends Field],
        views: [Object],
        adapters: [Object]
      },
      {
        type: 'Password',
        implementation: [class Password extends Field],
        views: [Object],
        adapters: [Object]
      }
    },
    _schemaNames: [ 'public' ],
    appVersion: { version: '1.0.0', addVersionToHttpHeaders: true, access: true },
    _listCRUDProvider: ListCRUDProvider {
      lists: [ [List], [List], [List] ],
      gqlNames: { listsMeta: '_ksListsMeta', listsMetaInput: '_ksListsMetaInput' }
    },
    _customProvider: CustomProvider {
      _schemaNames: [ 'public' ],
      _defaultAccess: { list: true, field: true, custom: true },
      _extendedTypes: [],
      _extendedQueries: [],
      _extendedMutations: [],
      _extendedSubscriptions: []
    },
    _providers: [
      ListCRUDProvider { lists: [Array], gqlNames: [Object] },
      CustomProvider {
        _schemaNames: [Array],
        _defaultAccess: [Object],
        _extendedTypes: [],
        _extendedQueries: [],
        _extendedMutations: [],
        _extendedSubscriptions: []
      },
      AppVersionProvider { _access: [Object], _version: '1.0.0' },    ListAuthProvider {
        authStrategy: [PasswordAuthStrategy],
        list: [List],
        access: [Object],
        gqlNames: [Object],
        hookManager: [HookManager]
      }
    ],
    adapter: MongooseAdapter {
      config: {
        mongoUri: 'mongodb+srv://uxdkhan:ACVyKjbCYMTl0byc@cluster0.2jvz1.mongodb.net/fitxstore?retryWrites=true&w=majority'
      },
      listAdapters: {
        Product: [MongooseListAdapter],
        ProductImage: [MongooseListAdapter],
        User: [MongooseListAdapter]
      },
      listAdapterClass: [class MongooseListAdapter extends BaseListAdapter],
      name: 'mongoose',
      mongoose: Mongoose {
        connections: [Array],
        models: [Object],
        modelSchemas: [Object],
        events: [EventEmitter],
        options: [Object],
        _pluralize: [Function: pluralize],
        Schema: [Function],
        plugins: [Array]
      },
      minVer: '4.0.0',
      _manyModels: {
        Product: Model { Product },
        ProductImage: Model { ProductImage },
        User: Model { User }
      }
    },
    queryLimits: { maxTotalResults: Infinity },
    extendGraphQLSchema: [Function (anonymous)],
    createList: [Function (anonymous)],
    createAuthStrategy: [Function (anonymous)]
  }

  */
