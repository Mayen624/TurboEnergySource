<template>
    <div>
      <div id="file-upload-container" data-hs-file-upload='{
        "maxFiles": 2,
        "maxFilesize": 2,
        "extensions": {
          "default": { "class": "shrink-0 size-5" },
          "jpg": { "class": "shrink-0 size-5" },
          "png": { "class": "shrink-0 size-5" }
        }
      }'>
        <template data-hs-file-upload-preview="">
          <div class="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">
            <div class="mb-1 flex justify-between items-center">
              <div class="flex items-center gap-x-3">
                <img class="rounded-lg hidden" data-dz-thumbnail="" />
                <div>
                  <p class="text-sm font-medium text-gray-800 dark:text-white">
                    <span
                      class="truncate inline-block max-w-[300px] align-bottom"
                      data-hs-file-upload-file-name=""
                    ></span>
                    .<span data-hs-file-upload-file-ext=""></span>
                  </p>
                  <p
                    class="text-xs text-gray-500 dark:text-neutral-500"
                    data-hs-file-upload-file-size=""
                  ></p>
                  <p
                    class="text-xs text-red-500"
                    style="display: none;"
                    data-hs-file-upload-file-error=""
                  >
                    File exceeds size limit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </template>
  
        <div
          class="cursor-pointer p-12 flex justify-center bg-white border border-dashed border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600"
          data-hs-file-upload-trigger=""
        >
          <div class="text-center">
            <div class="mt-4 text-sm text-gray-600">
              <span class="pe-1 font-medium text-gray-800 dark:text-neutral-200">
                Drop your images here or
              </span>
              <span
                class="bg-white font-semibold text-blue-600 hover:text-blue-700 rounded-lg decoration-2 hover:underline focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 dark:bg-neutral-800 dark:text-blue-500 dark:hover:text-blue-600"
                >browse</span
              >
            </div>
            <p class="mt-1 text-xs text-gray-400 dark:text-neutral-400">
              Pick up to 2 images, 2MB max.
            </p>
          </div>
        </div>
      </div>
  
      <button
        @click="submitImages"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Submit Images
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        images: [], // Array to store the selected images
      };
    },
    mounted() {
      // Initialize HSFileUpload
      const { element } = HSFileUpload.getInstance("#file-upload-container", true);
  
      element.dropzone.on("addedfile", (file) => {
        if (this.images.length < 2) {
          this.images.push(file); // Add the file to the images array
        } else {
          element.dropzone.removeFile(file); // Prevent more than 2 files
          alert("You can only add up to 2 images.");
        }
      });
  
      element.dropzone.on("removedfile", (file) => {
        // Remove the file from the images array
        this.images = this.images.filter((img) => img !== file);
      });
    },
    methods: {
      submitImages() {
        if (this.images.length === 0) {
          alert("No images selected.");
          return;
        }
  
        // Prepare a FormData object to send the images
        const formData = new FormData();
        this.images.forEach((image, index) => {
          formData.append(`image${index + 1}`, image);
        });
  
        // Send the formData to your API or handle it as needed
        console.log("Images ready for submission:", this.images);
  
        // Example of sending via fetch:
        // fetch('/upload-endpoint', {
        //   method: 'POST',
        //   body: formData
        // }).then(response => {
        //   console.log('Upload response:', response);
        // }).catch(error => {
        //   console.error('Upload error:', error);
        // });
      },
    },
  };
  </script>
  