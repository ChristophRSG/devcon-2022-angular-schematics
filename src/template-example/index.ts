import { apply, applyTemplates, mergeWith, Rule, SchematicContext, Tree, url } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { Schema as TemplateExampleSchema } from './schema';


export default function templates(options: TemplateExampleSchema): Rule {
    return (_tree: Tree, _context: SchematicContext) => {

        const templateSource = apply(url('./files'), [
            applyTemplates({
                dasherize: strings.dasherize,
                capitalize: strings.capitalize,
                name: options.name,
                magicNumber: options.magicNumber
            }),
        ]);

        return mergeWith(templateSource);
    };
}
