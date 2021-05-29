import fecth from 'node-fetch'
import ipfs from '../../utils/ipfs'

const rooDir = './NFTs'

export type AwaitIterable<T> = Iterable<T> | AsyncIterable<T>

export type ToContent =
  | string
  | InstanceType<typeof String>
  | ArrayBufferView
  | ArrayBuffer
  | Blob
  | AwaitIterable<Uint8Array>
  | ReadableStream<Uint8Array>

export interface IpfsMedia {
  path?: string
  content: ToContent
}

const demoCall = function(data: any) {
  console.log('uploaded : ' + data)
}

export const uploadIPFS = async (ipfsMedia: IpfsMedia): Promise<string> => {
  try {
    if (!ipfsMedia.content) {
      return 'No content found'
    } else {
      const { cid } = await ipfs.add(
        { path: `${rooDir}/${ipfsMedia.path}`, content: ipfsMedia.content },
        {
          pin: true,
          progress: demoCall // for testing purpose not working issue  https://github.com/ipfs/js-ipfs/issues/2854
        }
      )
      return cid.toString() // To fetch data you need to use the full url ex: `${host}/${cid.toString()}/${data.name}`
    }
  } catch (error) {
    return error
  }
}

export const getdataIPFS = async (name: string, hash: string): Promise<any> => {
  try {
    const data = await fecth(hash)
    return data
  } catch (error) {
    throw Error(error)
  }
}
