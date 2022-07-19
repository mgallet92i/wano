import { TObject, TProperties, Type } from '@sinclair/typebox';
import { FastifySchema } from 'fastify';
import { TReply } from './common.schema';

// export type Survey = Static<typeof TSurvey>;
export interface Survey {
    id: string;
    title: string;
}

const surveyProperties: TProperties = {
    id: Type.String(),
    title: Type.Optional(Type.String())
};
export const TSurvey: TObject = Type.Object(surveyProperties);

export const SurveySchema: FastifySchema = {
    body: Type.Strict(TSurvey),
    response: {
        200: Type.Strict(TReply)
    }
};

export interface SurveyParams {
    id: string;
}