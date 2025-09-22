import { Command } from "commander";
import * as fs from 'fs';

const program = new Command();
const DATA_FILE = 'todos.json';

interface Todo {
  id: number;
  task: string;
  done: boolean;
}

type Todos = Todo[];

function loadTodos(): Todos {
  if (!fs.existsSync(DATA_FILE)) return [];
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
}

function saveTodos(todos: Todos) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
}

function deleteTodo(deleteIds: string[]): boolean {
  const ids = deleteIds.map((id) => parseInt(id));
  const todos = loadTodos();
  const found = todos.some((todo) => ids.includes(todo.id))
  if (!found) return false;
  const newTodos = todos.filter((todo) => !ids.includes(todo.id));
  saveTodos(newTodos);
  return true
}

program
  .name('todo')
  .description('シンプルなTodo CLI')
  .version('1.0.0');

program
  .command('add <tasks...>')
  .description('タスクを追加')
  .action((tasks: string[]) => {
    const todos = loadTodos();
    const maxId = todos.length > 0 ? Math.max(...todos.map((t) => t.id)) : 0;
    const newTodos = [
      ...todos,
      ...tasks.map((task, i) => ({
        id: maxId + i + 1,
        task,
        done: false
      })),
    ]
    saveTodos(newTodos);
    tasks.forEach((task, i) => {
      console.log(`タスクを追加しました ${i}:${task}`);
    });
  });

program
  .command('list')
  .description('タスク一覧を表示')
  .action(() => {
    const todos = loadTodos();
    if (todos.length === 0) {
      console.log('タスクはありません');
      return;
    }
    const taskList = todos.map((todo, i) => `${i + 1}.${todo.task}`).join(' / ');
    console.log(taskList);
  });

program
  .command('delete <taskId...>')
  .description('指定のタスクを削除')
  .action((taskIds: string[]) => {
    const taskList = taskIds.join(' / ');
    if (deleteTodo(taskIds)) {
      console.log(`タスク番号：${taskList}を削除しました`);
    } else {
      console.log(`タスク番号；${taskList}が見つかりません`);
    }
  });

  program.parse(process.argv);

