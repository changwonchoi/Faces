from google_images_download import google_images_download   #importing the library

response = google_images_download.googleimagesdownload()   #class instantiation

arguments = {"keywords":"화난 사람 얼굴, 웃는 사람 얼굴, 메롱 얼굴","limit":100,"format":"jpg","print_urls":False,"color_type":"black-and-white"}   #creating list of arguments
paths = response.download(arguments)   #passing the arguments to the function
print(paths)   #printing absolute paths of the downloaded images

