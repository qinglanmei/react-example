import React,{Component} from 'react';//引入react
import ProductTable from '.././productTable/index.js';//引入数据集合
import SearchBar from '.././searchBar/index.js';//引入数据集合
import './index.scss?l';//引入css文件
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