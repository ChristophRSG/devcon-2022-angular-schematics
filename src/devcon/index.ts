import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


export function devcon(options: any): Rule {
    return (tree: Tree, context: SchematicContext) => {
        context.logger.info('Hello RSG Devcon 2022!');

        context.logger.info(`Options are: ${JSON.stringify(options)}`);

        tree.create('devcon.txt', 'Angular Schematics 2022');
        return tree;
    };
}
