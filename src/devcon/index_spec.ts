import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('devcon', () => {
    it('should create devcon.txt', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('devcon', {}, Tree.empty())
            .toPromise();

        expect(tree.files).toEqual(['/devcon.txt']);
    });

    it('should have text in devcon.txt', async () => {
        const runner = new SchematicTestRunner('collection', collectionPath);
        const tree = await runner
            .runSchematicAsync('devcon', {}, Tree.empty())
            .toPromise();

        expect(tree.readContent('devcon.txt')).toEqual('Angular Schematics 2022');
    });
});
