import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';
import { PathFragment } from '@angular-devkit/core';

const collectionPath = path.join(__dirname, '../collection.json');

describe('template-example', () => {

    it('should fail without magicNumber', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);

        await expectAsync(runner
            .runSchematicAsync('template-example', {}, Tree.empty())
            .toPromise()).toBeRejected();
    });

    it('should write "lower than or equal to" text into if-example.txt if magicNumber < 10', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('template-example', {magicNumber: 9}, Tree.empty())
            .toPromise();

        expect(tree.readContent('/src/other_folder/if-example.txt')).toContain('Your Magic Number is lower than or equal to 10!');
    });

    it('should write "bigger than" text into if-example.txt magicNumber > 10', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('template-example', {magicNumber: 11}, Tree.empty())
            .toPromise();

        expect(tree.readContent('/src/other_folder/if-example.txt')).toContain('Your Magic Number is bigger than 10!');
    });

    it('should name folder "no-name" if no name was entered', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('template-example', {magicNumber: 11}, Tree.empty())
            .toPromise();

        expect(tree.getDir('/src').subdirs).toEqual(['other_folder', 'no-name'] as PathFragment[]);
    });

    it('should name folder according to name', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('template-example', {name: 'myCustomName', magicNumber: 11}, Tree.empty())
            .toPromise();

        expect(tree.getDir('/src').subdirs).toEqual(['other_folder', 'my-custom-name'] as PathFragment[]);
    });
});
