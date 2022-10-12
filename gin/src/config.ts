import conf from 'conf';
import { ValueSchema } from 'conf/dist/source/types';

export interface Workspace {
  name: string;
  pier: string;
  source: string;
  desk: string;
}

interface ConfigSchema {
  workspaces: Workspace[]
}

const schema = {
  workspaces: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        pier: { type: 'string' },
        source: { type: 'string' },
        desk: { type: 'string' }
      }
    }
  } as ValueSchema
}

export const config = new conf<ConfigSchema>({ schema });