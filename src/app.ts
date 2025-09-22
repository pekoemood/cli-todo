import { Command } from 'commander';

const program = new Command();

program
  .name("ts-cli")
  .description("シンプルなCLIアプリ")
  .version("1.0.0");

program
  .command("hello <name>")
  .description("名前を指定して挨拶する")
  .action((name: string) => {
    console.log(`こんにちは,${name}さん！`);
  });

program.parse(process.argv);