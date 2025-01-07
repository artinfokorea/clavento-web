import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import "@ckeditor/ckeditor5-build-classic/build/translations/ko"
import "ckeditor5/ckeditor5.css"
import { getFile, uploadFile } from "@/services/system"
import type { Editor as CKEditorType } from "@ckeditor/ckeditor5-core"

interface Props {
  value: string
  onChange: (value: string) => void
}

const Editor = ({ value, onChange }: Props) => {
  function MyCustomUploadAdapterPlugin(editor: CKEditorType) {
    editor.plugins.get("FileRepository").createUploadAdapter = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      loader: any,
    ) => {
      return {
        upload: () => {
          return new Promise((resolve, reject) => {
            loader.file.then(async (file: File) => {
              try {
                const response = await uploadFile(file)

                if (response) {
                  const file = await getFile(response.data.id)
                  const uploadedImageUrl = file.data.url
                  resolve({ default: uploadedImageUrl })
                }
              } catch (error) {
                reject(error)
              }
            })
          })
        },
      }
    }
  }

  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "|",
      "imageUpload",
      "blockQuote",
    ],
    language: "ko",
    extraPlugins: [MyCustomUploadAdapterPlugin],
    initialData: value,
  }

  return (
    <CKEditor
      editor={ClassicEditor}
      config={editorConfiguration}
      onReady={editor => {
        editor.editing.view.change(writer => {
          writer.setStyle(
            "height",
            "500px",
            editor.editing.view.document.getRoot()!,
          )
        })
      }}
      onChange={(event, editor) => {
        const data = editor.getData()
        onChange(data)
      }}
    />
  )
}

export default Editor
