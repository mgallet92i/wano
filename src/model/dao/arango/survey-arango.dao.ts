import { Survey } from '../../entities/survey';
import { Document, DocumentMetadata, EdgeMetadata } from 'arangojs/documents';
import { Dao } from '../dao';
import { Graph, GraphEdgeCollection, GraphVertexCollection } from 'arangojs/graph';
import { ArangoDao } from './arango.dao';

export class SurveyArangoDao extends ArangoDao<Survey> implements Dao<Survey> {

    readonly VERTEX_COLLECTION: string = 'survey';

    readonly EDGE_COLLECTION: string = 'hasSurvey';

    readonly GRAPH_NAME: string = 'wanoGraph';

    private vertexCollection: GraphVertexCollection<Survey>;

    private edgeCollection: GraphEdgeCollection;

    private originVertexId: string = 'wano/13969'; // todo

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor({ dataBase }) {
        super();
        const graph: Graph = dataBase.graph(this.GRAPH_NAME);
        this.vertexCollection = graph.vertexCollection<Survey>(this.VERTEX_COLLECTION);
        this.edgeCollection = graph.edgeCollection(this.EDGE_COLLECTION);
    }

    async find(id: string): Promise<Survey> | null {
        const doc: Document<Survey> = await this.vertexCollection.vertex(id, true);
        return this.convert(doc, new Survey()); // Todo: make it better !!! no new Survey(), just the doc in parameter
    }

    // async filter(): Promise<Document<Survey>[]> {
    //     try {
    //         return await this.vertexCollection.documents([]);
    //     } catch (e) {
    //         return [];
    //     }
    // }

    async save(data: Survey): Promise<string> {
        const meta: DocumentMetadata = await this.vertexCollection.save(data);
        this.edgeCollection.save({ _from: this.originVertexId, _to: meta._id } as EdgeMetadata);
        return meta._key;
    }

    saveAll(data: Survey[]) {
    }

    update(data: Survey) {
    }

    delete(data: Survey) {
    }

    // dispose() {
    // }
}