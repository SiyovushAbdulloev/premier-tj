import classes from "./index.module.css"
import React, {ForwardedRef, forwardRef, useState} from "react";
import {className} from "src/shared/utils/className";

interface UploadProps {
    sizeLimit: number
    extensions: Array<string>
    iconPath?: typeof React.Component
    placeholder?: any
    sizeErrorText?: string
    extensionErrorText?: string
}

const Upload = forwardRef((props: UploadProps, ref: ForwardedRef<any>) => {
    const [filename, setFilename] = useState<string>('')
    const [dropping, setDropping] = useState<boolean>(false)
    const [warning, setWarning] = useState<string>('')

    const checkConstraints = (file: File): boolean => {
        if (file.size / 1000 > props.sizeLimit) {
            setWarning(props.sizeErrorText ?? 'Размер файла слишком большой')
            return true
        }
        if (!props.extensions.includes(file.type)) {
            setWarning(props.extensionErrorText ?? 'Неправильный формат файла.')
            return true
        }
        return false
    }

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const file = e.target.files[0]
        const failed = checkConstraints(file)
        if (!failed) {
            // @ts-ignore
            ref.current = file
            // @ts-ignore
            setFilename(file.name)
            setWarning('')
        }
    }

    const onDrop = (e: React.DragEvent<HTMLInputElement>) => {
        e.preventDefault()
        // @ts-ignore]
        const file = e.dataTransfer.files[0]
        const failed = checkConstraints(file)
        if (!failed) {
            // @ts-ignore]
            ref.current = file
            setFilename(file.name)
            setDropping(false)
            setWarning('')
        }
    }

    const onDragOver = (e: React.DragEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDropping(true)
    }

    const onDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
        e.preventDefault()
        setDropping(false)
    }

    return (
        <div className={className(classes.upload)}>
            <label className={className(classes.label, {[classes.dropping]: dropping})}>
                <input
                    type="file"
                    className={classes.input}
                    onChange={onUpload}
                    onDrop={(e) => onDrop(e)}
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    accept={props.extensions.join(',')}
                />
                {props.iconPath ? (
                    <props.iconPath
                        stroke={dropping ? '#fff' : 'currentColor'}
                        width={40}
                        height={40}
                    />
                ) : (
                    <svg
                        width={40}
                        height={40}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke={dropping ? '#fff' : '#bfbfbf'}
                        className="w-6 h-6"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"/>
                    </svg>
                )}
                <span>{props.placeholder ?? 'Drop file here or click to upload'}</span>
            </label>
            <div className={classes.extensionLabel}>
                Файлы должны быть с расширениями {props.extensions.join(',')} и размером меньше чем {props.sizeLimit}kb
            </div>
            {warning.length ? (
                <div className={classes.warning}>
                    {warning}
                </div>
            ) : null}
            <div>{filename}</div>
        </div>
    )
})

Upload.displayName = 'Upload'

export default Upload
