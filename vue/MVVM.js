// M - Model  代表数据模型,可以在里面修改数据操作业务逻辑.

// V - View   代表UI视图, 负责构建渲染页面.

// VM - ViewModel 它是同步View 和 Model的对象，连接Model和View


// 在MVVM架构下，View 和 Model 之间并没有直接的联系，而是通过ViewModel进行交互，
// Model 和 ViewModel 之间的交互是双向的， 因此View 数据的变化会同步到Model中，
// 而Model 数据的变化也会立即反应到View 上。