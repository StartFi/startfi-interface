import uint8ArrayConcat from 'uint8arrays/concat'
import all from 'it-all'
import ipfs from '../../utils/ipfs'
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

export function ProgressCallIPFS(bytesLoaded: any, dataSize: number): string {
  console.log('uploaded : ' + (bytesLoaded / dataSize) * 100 + '%')
  return (bytesLoaded / dataSize) * 100 + '%'
}

export const uploadIPFS = async (ipfsMedia: IpfsMedia): Promise<string> => {
  try {
    if (!ipfsMedia.content) {
      return 'No content found'
    } else {
      const { cid } = await ipfs.add(
        { path: ipfsMedia.path, content: ipfsMedia.content },
        {
          progress: function ProgressData(bytesLoad): void {
            ProgressCallIPFS(bytesLoad, ipfsMedia.content.toString().length)
          }
        }
      )
      return cid.toString() // To fetch data you need to use the full url ex: `https://ipfs.io/ipfs/${cid.toString()}/${fileName}`
    }
  } catch (error) {
    return error
  }
}

export const getdataIPFS = async (path: string): Promise<any> => {
  try {
    return uint8ArrayConcat(await all(await ipfs.cat(path)))
  } catch (error) {
    throw Error(error)
  }
}
