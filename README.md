##结合react官网的案例,利用webpack+es6,完成了React案例。

##[React官网组件案例](http://reactjs.cn/react/docs/thinking-in-react.html)

##[github地址](https://github.com/ToNiQian/react-example)
##[demo地址](http://www.520lin.com/example/example.html)
***
###项目结构图:
![](http://upload-images.jianshu.io/upload_images/2701853-0b10313f36c2f735.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###github上面获取源码之后,安装所需要的插件
***
```
npm install 
```
###提取开发环境公共js,如react, react-dom
***
```
npm run vendor
```
###运行开发环境
***
```
npm run start
```
###提取生产环境公共js,如react, react-dom
***
```
npm run prod-vendor
```
###运行生产环境,生成dist
***
```
npm run prod
```

###案例主要分为5个组件
***
![](http://upload-images.jianshu.io/upload_images/2701853-ebd237d14fd9031f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

###一、SearchBar（蓝色表现部分）
***
```
import React,{Component} from 'react';//引入react
import './index.scss';//引入css文件
//接收用户输入的组件
export default class SearchBar extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    /**
     * 输入框改变或者复选框改变 调用父组件的方法,传递需要改变state的参数
     * @return {[type]} [description]
     */
    handleChange=()=>{
        this.props.onUserInput(
            this.refs.filterTextInput.value,
            this.refs.inStockOnlyInput.checked
        );
    }
    render(){   
        return(
            <form>
                <input className='txtName' type="text" 
                placeholder="Search..." 
                value={this.props.filterText} 
                ref="filterTextInput"
                onChange={this.handleChange}
                />
                <p>
                    <input type="checkbox" name="" 
                    checked={this.props.inStockOnly}
                    ref="inStockOnlyInput"
                    onChange={this.handleChange}
                     />
                    {' '}
                    Only show products in stock
                </p>
            </form>
        )
    }
}
```
###二、ProductRow（红色表现部分）
***
```
import React,{Component} from 'react';//引入react
import './index.scss';//引入css文件
//创建列表组件
export default class ProductRow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    
    render(){
        //根据stocked状态显示时候需要加上红色
        let name=this.props.product.stocked ? 
                this.props.product.name:
                <span style={{color: 'red'}}>{this.props.product.name}</span>
        return(
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        )
    }
}
```
###三、ProductCategoryRow（蓝绿色表示部分）
***
```
import React,{Component} from 'react';//引入react
import './index.scss';//引入css文件

//创建列标题组件
export default class ProductCategoryRow extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    
    render(){
        return(
            <tr><th colSpan="2">{this.props.category}</th></tr>
        )
    }
}
```
###四、ProductTable(绿色表现部分) 
#####(这是ProductCategoryRow与ProductRow组合而成的组合组件)
***
```
import React,{Component} from 'react';//引入react
import ProductCategoryRow from '.././productCategoryRow/index.js';//引入列标题
import ProductRow from '.././productRow/index.js';//引入列表组件
import './index.scss';//引入css文件
//创建根据用户输入过滤展示数据组件
export default class ProductTable extends Component{
    constructor(props){
        super(props);
        this.state={

        }
    }
    
    render(){   
        let rows=[];
            let lastCategory=null;
            this.props.products.forEach((product)=>{
                //过滤数据
                if(product.name.indexOf(this.props.filterText)===-1||(!product.stocked&&this.props.inStockOnly)){
                    return;
                }

                //如果是一个新的列标题,则加上列标题
                if(product.category!=lastCategory){
                    rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
                }
                /**
                 * 插入列表
                 * @type {Object}
                 */
                rows.push(<ProductRow product={product} key={product.name} />);
                /**
                 * 把最后的列标题更新
                 * @type {[type]}
                 */
                lastCategory=product.category;
        });
        return(
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        )
    }
}
```
###五、FilterableProductTable（橘色表现部分）
#####(productTable与searchBar组合而成的混合组件)
***
```
import React,{Component} from 'react';//引入react
import ProductTable from '.././productTable/index.js';//引入数据集合
import SearchBar from '.././searchBar/index.js';//引入数据集合
import './index.scss';//引入css文件
//创建根据用户输入过滤展示数据组件
export default class FilterableProductTable extends Component{
    constructor(props){
        super(props);
        this.state={
            filterText: '',
            inStockOnly: false
        }
    }
    //根据子组件传入的参数改变state
    handleUserInput=(filterText,inStockOnly)=>{
        this.setState({filterText:filterText,inStockOnly:inStockOnly});
    }
    render(){   
        return(
            <div className='wrap'>
                <SearchBar filterText={this.state.filterText}
                 inStockOnly={this.state.inStockOnly} 
                 onUserInput={this.handleUserInput}
                />
                < ProductTable products={this.props.products} filterText={this.state.filterText} inStockOnly={this.state.inStockOnly}  />
            </div>
        )
    }
}
```
(完成)