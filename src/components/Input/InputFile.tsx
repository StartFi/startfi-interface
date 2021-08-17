import React, { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ButtonFile, FileInput, InputFileFooter, InputFileHeader, LabelBlack, Progress } from './styles'
import LabelWithCheck from './LabelWithCheck'

interface InputFileProps {
  name: string
  label: string
  value: any
  onChange: (e: any) => void
  error: boolean
  progress: number
  filename: string
}

const InputFile: React.FC<InputFileProps> = ({ name, label, value, onChange, error, progress, filename }) => {
  const { t } = useTranslation()

  const ref = useRef<HTMLInputElement>(null)

  const [file, setFile] = useState('')

  return (
    <div>
      <InputFileHeader>
        <LabelWithCheck text={label} Label={LabelBlack} error={error} />
        {filename && (
          <ButtonFile
            onClick={() => {
              setFile('')
              onChange({ target: { files: [null] }, name: 'dataHash' })
            }}
          >
            {t('deleteFile')}
          </ButtonFile>
        )}
      </InputFileHeader>
      <InputFileFooter>
        <FileInput
          onClick={() => (progress === 0 ? ref.current?.click() : null)}
          minWidth="8vw"
          error={error}
          borderRight={filename ? true : false}
        >
          <input
            type="file"
            name={name}
            ref={ref}
            style={{ display: 'none' }}
            value={file}
            onChange={(e: any) => {
              setFile(e.target.value)
              onChange(e)
            }}
          />
          <div>{t(progress === 0 ? 'upload' : progress === 100 ? 'uploaded' : 'uploading')}</div>
          {/* <img src={progress === 0 ? Upload : progress === 100 ? Check : Pause} alt="Upload file" /> */}
        </FileInput>
        {filename && (
          <FileInput minWidth="22vw">
            <div>{filename.substring(0, 20)}</div>
            <Progress>{progress} %</Progress>
          </FileInput>
        )}
      </InputFileFooter>
    </div>
  )
}
export default InputFile
