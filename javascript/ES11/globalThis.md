声明：

在语言标准的层面，引入`globalThis`作为顶层对象。也就是说，任何环境下，`globalThis`都是存在的，都可以从它拿到顶层对象，指向全局环境下的`this`。

目的是统一顶层对象


Browser：顶层对象是window

Node：顶层对象是global

WebWorker：顶层对象是self

以上三者：通用顶层对象是globalThis