from google_images_download import google_images_download   #importing the library

response = google_images_download.googleimagesdownload()   #class instantiation

arguments = {"keywords":"smiling,frowning,angry,sticking tongue out,winking,kissing face","suffix_keywords":"person","limit":100,"format":"jpg","print_urls":False}   #creating list of arguments
paths = response.download(arguments)   #passing the arguments to the function
print(paths)   #printing absolute paths of the downloaded images