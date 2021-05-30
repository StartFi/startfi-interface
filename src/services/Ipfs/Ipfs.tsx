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
        { path: `${rooDir}/${ipfsMedia.path}`, content: ipfsMedia.content },
        {
          pin: true,
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

export const getdataIPFS = async (name: string, hash: string): Promise<any> => {
  try {
    const data = await fecth(hash)
    return data
  } catch (error) {
    throw Error(error)
  }
}
