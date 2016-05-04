var vMD = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    arg: 'Hello',
    todos: [
      {text: 'add some todos'}
    ],
    obj: {
      name: 'John',
      age: 20
    }
  },
  methods: {
    addTodo: function(prefix){
      var text = this.newTodo.trim();
      if(text){
        this.todos.push({text: prefix + text});
        this.newTodo = '';
      }
    },
    removeTodo: function(index){
      this.todos.splice(index, 1);
    }
  },
  computed: {
    b: function(){
      return this.todos.length;
    }
  }
});
