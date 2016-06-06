// console.log(React);
// console.log(ReactDOM);

var newsList = [
	{
		author: 'Саша Печкин',
		text: 'В четверг четвертого числа',
		bigText: 'тарыврв лыовыв лыов оывт лывлоывыэипэып фыдэвалтыфдтптфыэдв фшыофывашпоы фыдлп'
	},
	{
		author: 'Дима Димасик',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		bigText: 'в	четыре	с	четвертью	часа	четыре	чёрненьких	чумазеньких	чертёнка	чертили	чёрными	чернилами	чертёж.'
	},
	{
		author: 'Руставели',
		text: 'предали нас, предали',
		bigText: 'в	четыре	с	asas asdgsagh adfhdaf h 34t 43ty  35 '
	},
	{
		author: 'Гость',
		text: 'Все фигня, нами управляют словно пультом',
		bigText: 'asdgh 45 45d tjr6 urwt adfhdaf h 34t 43ty  35 '
	},
	{
		author: 'Дима Димасик',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		bigText: 'sdg sadg saharfh arhear hea5 e5e 44446 464 4 44 4 464 6jrthdahdah '
	},
	{
		author: 'Дима Димасик',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		bigText: '44444444444444444 4444 444444444 444 4444444 444 444444 5555 4552 235 35235 235 23235 523 5235 235'
	},
	{
		author: 'Дима Димасик',
		text: 'считаю, что доллар должен стоить меньше 1грн',
		bigText: '2134 w qy 3y 35q4e5h 4q5 q4 4 uj46j4q6jq46 jq46j q46jq4jhqqehqeh erh'
	},
];


var Article = React.createClass ({

	propTypes:	{				
		data:	React.PropTypes.shape({						
			author:	React.PropTypes.string.isRequired,						
			text:	React.PropTypes.string.isRequired,						
			bigText:	React.PropTypes.string.isRequired				
		})		
	},

	getInitialState: function()	{				
		return	{						
			visible: false				
		};		
	},

	readmoreClick: function(e) {
		e.preventDefault();
		this.setState({visible: true});
	},


	render: function() {

		// console.log('render',this);

		var author = this.props.data.author;
		var text = this.props.data.text;
		var bigText = this.props.data.bigText;
		var visible = this.state.visible;

		return(
			<div className="article">
				<div className="article__author">{author}</div>
				<div className="article__text">{text}</div>
				<a href="#" 
					onClick={this.readmoreClick} 
					className={'article__readmore '+ (visible ? 'none':'')}>
					подробнее
				</a>
				<div className={'article__big-text '+ (visible ? '': 'none')}>{bigText}</div>
			</div>
		)
	}
})

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


var	TestInput	=	React.createClass({
	
	getInitialState: function() {
		return {
			myValue: ''
		}
	},

	onChangeHandler:function(e)	{				
		this.setState({myValue:	e.target.value}) 
	},

	render:	function()	{				
		return	(						
			<input className='test-input' value='{this.state.myValue}' onChange='{this.onChangeHandler}' placeholder='введите значние'	/>			
		);		
	} 
});

var App = React.createClass({
	render: function() {
		return (
			<div className="app">
				<h1 className="news__title">новости</h1>
				<TestInput />
				<News data={newsList} /> {/*добавили свойство*/}
			</div>
		);
	}
});

ReactDOM.render(		
	<App />,
	document.getElementById('root')
)