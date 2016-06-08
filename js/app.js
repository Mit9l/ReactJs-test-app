// console.log(React);
// console.log(ReactDOM);

var my_news = [
	{
		author: 'User_1',
		text: 'В четверг четвертого числа',
		fullText: 'оператор "руки длинные делжи на ластоянии"  "10 секунд поаботай"  видать зубы выбили ))﻿'
	},
	{
		author: 'User_2',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		fullText: 'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили	чёрными	чернилами	чертёж.'
	},
	{
		author: 'User_3',
		text: 'предали нас, предали',
		fullText: 'в	четыре	с	asas asdgsagh adfhdaf h 34t 43ty  35 '
	},
	{
		author: 'User_4',
		text: 'Все фигня, нами управляют словно пультом',
		fullText: 'asdgh 45 45d tjr6 urwt adfhdaf h 34t 43ty  35 '
	},
	{
		author: 'User_5',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		fullText: 'sdg sadg saharfh arhear hea5 e5e 44446 464 4 44 4 464 6jrthdahdah '
	},
	{
		author: 'User_6',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		fullText: '44444444444444444 4444 444444444 444 4444444 444 444444 5555 4552 235 35235 235 23235 523 5235 235'
	},
	{
		author: 'User_7',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		fullText: '2134 w qy 3y 35q4e5h 4q5 q4 4 uj46j4q6jq46 jq46j q46jq4jhqqehqeh erh'
	},
];


window.ee	=	new	EventEmitter();

/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var Article = React.createClass ({

	propTypes:	{				
		data:	React.PropTypes.shape({						
			author:	React.PropTypes.string.isRequired,						
			text:	React.PropTypes.string.isRequired,						
			fullText:	React.PropTypes.string.isRequired,			
		})		
	},

	getInitialState: function()	{				
		return	{						
			visible: false				
		};		
	},

	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({visible: !this.state.visible});
	},


	render: function() {

		// console.log('render',this);

		var author = this.props.data.author;
		var text = this.props.data.text;
		var fullText = this.props.data.fullText;
		var visible = this.state.visible;

		return(
			<div className="article">
				<div className="article__author">{author}</div>
				<div className="article__text">{text}</div>
				<a href="#" 
					onClick={this.readmoreClick} 
					// className={'article__readmore '+ (visible ? 'none':'')}>
					className={'article__readmore'}>
					подробнее
				</a>
				<div className={'article__big-text '+ (visible ? '': 'none')}>{fullText}</div>
			</div>
		)
	}
})
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var News = React.createClass({
	propTypes: {
		data: React.PropTypes.array.isRequired
	},


	render: function() {

		var data = this.props.data;
		var newsTemplate;

		if (data.length > 0) {
			newsTemplate = data.map(function(item, index) {
				return (
					<div key={index}>
						<Article data={item} />
					</div>
				)
			})
		} else {
			newsTemplate = <p className="news-empty">Новостей нет</p>
		}

		return (
			<div className="news">
				{newsTemplate}
				<strong className={data.length > 0 ? '':'none'}>Всего новостей: {data.length} </strong>
			</div>
		)
	}

});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var	Add	=	React.createClass({

	getInitialState: function() {
		return {
			agreeNotChecked: true,
			authorIsEmpty: true,
			textIsEmpty: true,
			fullTextIsEmpty: true,
			// btnIsDisabled: true
		}
	},

	onCheckRuleClick: function(e) {
		this.setState({agreeNotChecked: !this.state.agreeNotChecked})
	},

	onAuthorChange: function(e) {
		if(e.target.value.trim().length > 0) {
			this.setState({authorIsEmpty: false})
		} else {
			this.setState({authorIsEmpty: true})
		}
	},

	onTextChange: function(e) {
		if (e.target.value.trim().length > 0) {
			this.setState({textIsEmpty: false})
		} else {
			this.setState({textIsEmpty: true})
		}
	},

	onFullTextChange: function(e) {
		if(e.target.value.trim().length > 0) {
			this.setState({fullTextIsEmpty: false})
		} else {
			this.setState({fullTextIsEmpty: true})
		}
	},

	onBtnClickHandler:	function(e)	{
		e.preventDefault();	
		var textEl = ReactDOM.findDOMNode(this.refs.text);
		var authorEl = ReactDOM.findDOMNode(this.refs.author);
		var fullTextEl = ReactDOM.findDOMNode(this.refs.fullText);

		var author = ReactDOM.findDOMNode(this.refs.author).value;
		var text = ReactDOM.findDOMNode(this.refs.text).value;
		var fullText = ReactDOM.findDOMNode(this.refs.fullText).value;
		// alert(''+author+'\n'+text);
		
		var item = [{
			author: author,
			text: text,
			fullText: fullText, 
		}];

		window.ee.emit('News.add',	item);

		textEl.value = ''
		authorEl.value = ''
		fullTextEl.value= ''
		this.setState({authorIsEmpty: true})
		this.setState({textIsEmpty: true})
		this.setState({fullTextIsEmpty: true})
	},

	componentDidMount: function() {
		ReactDOM.findDOMNode(this.refs.author).focus();
	},

	render:	function()	{
		var	agreeNotChecked	=	this.state.agreeNotChecked,								
			authorIsEmpty	=	this.state.authorIsEmpty,

			textIsEmpty	=	this.state.textIsEmpty,
			fullTextIsEmpty = this.state.fullTextIsEmpty;

		return	(						
			<form className='add	cf'>
				<input
					type='text'	
					className='add__author'										
					defaultValue=''		
					placeholder='Ваше	имя'										
					ref='author'
					onChange={this.onAuthorChange}							
				/>								
				<textarea										
					className='add__text'										
					defaultValue=''										
					placeholder='Текст	пред-новости'										
					ref='text'
					onChange={this.onTextChange}								
				></textarea>
				<textarea
					className="add__text"
					defaultValue=''
					placeholder='Текст полной новости'
					ref='fullText'
					onChange={this.onFullTextChange}
				></textarea>							
				<label	className='add__checkrule'>										
					<input	type='checkbox'	ref='checkrule'	onChange={this.onCheckRuleClick} />Я	согласен с правилами								
				</label>								
				<button										
					className='add__btn'										
					onClick={this.onBtnClickHandler}										
					ref='alert_button'
					disabled={agreeNotChecked || authorIsEmpty || textIsEmpty || fullTextIsEmpty}
					>										
					Добавить новость								
				</button>						
			</form>			
		);		
	} 
})
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var App = React.createClass({

	getInitialState: function() {
		return {
			news: my_news
		}
	},

	componentDidMount: function() {
		// слушаем событие на создание новости
		var self = this;
		window.ee.addListener('News.add', function(item) {
			var nextNews = item.concat(self.state.news);
			self.setState({news: nextNews})
		});
	},

	componentWillUnmount: function() {
		window.ee.removeListener('News.add')
	},

	render: function() {
		// console.log('render')
		return (
			<div className="app">
				<Add />
				<h1 className="news__title">новости</h1>
				<News data={this.state.news} /> {/*добавили свойство*/}
			</div>
		);
	}
});
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
ReactDOM.render(		
	<App />,
	document.getElementById('root')
)