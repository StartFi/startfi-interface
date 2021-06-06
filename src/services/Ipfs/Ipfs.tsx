import uint8ArrayConcat from 'uint8arrays/concat'
import all from 'it-all'
import ipfs from '../../utils/ipfs'
import store from 'state'
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

export function ProgressCallIPFS(bytesLoaded: any, dataSize: number): void {
  store.dispatch({ type: 'ipfs/progress', payload: { progress: Math.round((bytesLoaded / dataSize) * 100) + '%' } })
}

export const uploadIPFS = async (ipfsMedia: IpfsMedia): Promise<string> => {
  try {
    if (!ipfsMedia.content) {
      return 'No content found'
    } else {
      const mediaSize =
        (ipfsMedia.path as string).split('.').pop() === '.json'
          ? ipfsMedia.content.toString().length
          : (ipfsMedia.content as File).size
          ? (ipfsMedia.content as File).size
          : Buffer.byteLength(ipfsMedia.content as Buffer)
      const { cid } = await ipfs.add(
        { path: ipfsMedia.path, content: ipfsMedia.content },
        {
          progress: function ProgressData(bytesLoad): void {
            ProgressCallIPFS(bytesLoad, mediaSize)
          }
        }
      )
      return cid.toString() // To fetch data you need to use the full url ex: `https://ipfs.io/ipfs/${cid.toString()}/${fileName}`
    }
  } catch (error) {
    return error
  }
}

export const getDataIPFS = async (path: string): Promise<any> => {
  try {
    return uint8ArrayConcat(await all(await ipfs.cat(path)))
  } catch (error) {
    throw Error(error)
  }
}
