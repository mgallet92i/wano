import { Survey } from '../../entity/survey';
import { Document, DocumentMetadata, EdgeMetadata } from 'arangojs/documents';
import { Dao } from '../dao';
import { Graph, GraphEdgeCollection, GraphVertexCollection } from 'arangojs/graph';
import { ArangoDao } from './arango.dao';

export class SurveyArangoDao extends ArangoDao<Survey> implements Dao<Survey> {

    readonly ORIGIN_VERTEX_ID: string = 'wano/origin';

    readonly VERTEX_COLLECTION: string = 'survey';

    readonly EDGE_COLLECTION: string = 'hasSurvey';

    readonly GRAPH_NAME: string = 'wanoGraph';

    private vertexCollection: GraphVertexCollection<Survey>;

    private edgeCollection: GraphEdgeCollection;

    // eslint-disable-next-line @typescript-eslint/typedef
    constructor({ dataBase }) {
        super(Survey); // todo: get type generic <T> ???
        const graph: Graph = dataBase.graph(this.GRAPH_NAME);
        this.vertexCollection = graph.vertexCollection<Survey>(this.VERTEX_COLLECTION);
        this.edgeCollection = graph.edgeCollection(this.EDGE_COLLECTION);
    }

    async find(id: string): Promise<Survey> | null {
        const doc: Document<Survey> = await this.vertexCollection.vertex(id, true);
        return this.toEntity(doc);
    }

    async save(data: Survey): Promise<string> {
        const meta: DocumentMetadata = await this.vertexCollection.save(data);
        this.edgeCollection.save({ _from: this.ORIGIN_VERTEX_ID, _to: meta._id } as EdgeMetadata);
        return meta._key;
    }

    saveAll(data: Survey[]) {
    }

    update(data: Survey) {
    }

    delete(data: Survey) {
    }
}