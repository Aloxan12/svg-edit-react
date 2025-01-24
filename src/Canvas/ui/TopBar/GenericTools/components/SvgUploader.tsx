import React, { useRef } from 'react'
import IconButton from '../../../IconButton/IconButton'

interface SvgUploaderProps {
  onUpload: (svgContent: string) => void // Callback для обработки загруженного SVG
}

const SvgUploader: React.FC<SvgUploaderProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result) {
          onUpload(reader.result as string)
        }
      }
      reader.readAsText(file)
    }
    event.target.value = ''
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      {/* Скрытый input для выбора файла */}
      <input
        type="file"
        accept=".svg"
        ref={fileInputRef}
        style={{
          position: 'absolute',
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: 'none',
        }}
        onChange={handleFileChange}
      />
      {/* Видимая кнопка */}
      <IconButton icon="Upload" onClick={handleClick} />
    </div>
  )
}

export default SvgUploader
