import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'fs'
import { join } from 'path'
import { resolvers } from '.'

const prod = process.env.NODE_ENV === 'production'
const baseDir = prod ? 'dist' : 'src'

const schemaPath = join(process.cwd(), baseDir, 'apps/resolvers/schema.graphql')
const typeDefs = readFileSync(schemaPath, { encoding: 'utf-8' })

export const schema = makeExecutableSchema({ typeDefs, resolvers })
