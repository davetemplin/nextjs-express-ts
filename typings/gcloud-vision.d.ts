declare namespace GoogleCloud {
    interface Vision {
        annotate(request: Vision.AnnotateImageRequest): Promise<[Vision.AnnotateImageResponse, ApiResponse]>;
        detect(image: string|Buffer|File, options: Vision.DetectOptions): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectCrops(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse|Vision.DetectResponse[], ApiResponse]>;
        detectFaces(image: Vision.ImageOptions, options?: Vision.DetectFacesOptions): Promise<[Vision.DetectFacesResponse, ApiResponse]>;
        detectLabels(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectLandmarks(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectLogos(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectProperties(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectSafeSearch(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectSimilar(image: Vision.ImageOptions, options?: Vision.DetectOptions|string[]): Promise<[Vision.DetectResponse, ApiResponse]>;
        detectText(name: string): Promise<[string[], ApiResponse]>;
        detectText(name: string, options: Vision.DetectOptions): Promise<[string[]|{desc: string, bounds: Vision.Vertex[]}, ApiResponse]>;
        readDocument(name: string, options?: Vision.DetectOptions|string[]): Promise<[Document[], ApiResponse]>;
    }

    namespace Vision {
        interface FaceAnnotation {
            boundingPoly: BoundingPoly;
            fdBoundingPoly: BoundingPoly;
            landmarks: Landmark[];
            rollAngle: number,
            panAngle: number,
            tiltAngle: number,
            detectionConfidence: number,
            landmarkingConfidence: number,
            joyLikelihood: Likelihood,
            sorrowLikelihood: Likelihood,
            angerLikelihood: Likelihood,
            surpriseLikelihood: Likelihood,
            underExposedLikelihood: Likelihood,
            blurredLikelihood: Likelihood,
            headwearLikelihood: Likelihood
        }
        interface Landmark {
            type: string;
            position: Vertex3;
        }
        interface Vertex3 {
            x: number;
            y: number;
            z: number;
        }
        type Likelihood = 'UNKNOWN'|'VERY_UNLIKELY'|'UNLIKELY'|'POSSIBLE'|'LIKELY'|'VERY_LIKELY';
        
        interface EntityAnnotation {
            mid: string,
            locale: string,
            description: string,
            score: number,
            confidence: number,
            topicality: number,
            boundingPoly: BoundingPoly,
            locations: LocationInfo[],
            properties: EntityProperty[]
        }
    
        interface BoundingPoly {
            verticies: Vertex[];
        }
        interface LocationInfo {
            latLng: LatLng;
        }
        interface EntityProperty {
            name: string;
            value: string;
        }
        interface Vertex {
            x: number;
            y: number;
        }
        
        interface SafeSearchAnnotation {
            adult: Likelihood,
            spoof: Likelihood,
            medical: Likelihood,
            violence: Likelihood
        }
        
        interface ImageProperties {
            dominantColors: DominantColorsAnnotation;
        }
        interface DominantColorsAnnotation {
            colors: ColorInfo[];
        }
        interface ColorInfo {
            color: Color;
            score: number;
            pixelFraction: number;
        }
        interface Color {
            red: number;
            green: number;
            blue: number;
            alpha: number;
        }
        
        interface Status {
            code: number;
            message: string;
            details: Array<{"@type": string}>;
        }
    
        /**
         * Client image to perform Google Cloud Vision API tasks over.
         */
        interface Image {
            /**
             * Image content, represented as a stream of bytes.
             * Note: as with all bytes fields, protobuffers use a pure binary representation, whereas JSON representations use base64.
             * A base64-encoded string.
             */
            content: string;
            /**
             * Google Cloud Storage image location.
             * If both content and source are provided for an image, content takes precedence and is used to perform the image annotation request.
             */
            source: ImageSource;
        }
    
        /**
         * External image source (Google Cloud Storage image location).
         */
        interface ImageSource {
            /**
             * Google Cloud Storage image URI, which must be in the following form: gs://bucket_name/object_name (for details, see Google Cloud Storage Request URIs).
             * NOTE: Cloud Storage object versioning is not supported.
             */
            gcsImageUri: string;
        }
    
        /**
         * Users describe the type of Google Cloud Vision API tasks to perform over images by using *Feature*s.
         * Each Feature indicates a type of image detection task to perform. Features encode the Cloud Vision API vertical to operate on and the number of top-scoring results to return.
         */
        interface Feature {
            /** The feature type. */
            type: 'TYPE_UNSPECIFIED'|'FACE_DETECTION'|'LANDMARK_DETECTION'|'LOGO_DETECTION'|'LABEL_DETECTION'|'TEXT_DETECTION'|'SAFE_SEARCH_DETECTION'|'IMAGE_PROPERTIES';
            /** Maximum number of results of this type. */
            maxResults: Number;
        }    
    
        interface DetectResponse {
            crops: Crop[];
            document: string;
            // https://cloud.google.com/vision/docs/detecting-faces
            faces: Face[];
            // https://cloud.google.com/vision/docs/detecting-landmarks
            landmarks: Label[];
            // https://cloud.google.com/vision/docs/detecting-labels
            labels: Label[];
            // https://cloud.google.com/vision/docs/detecting-logos
            logos: Label[];
            // https://cloud.google.com/vision/docs/detecting-properties
            properties: Property[];
            // https://cloud.google.com/vision/docs/detecting-safe-search
            safeSearch: SafeSearchAnnotation;
            similar: Similar;
            // https://cloud.google.com/vision/docs/detecting-text
            text: Text[];
        }
    
    
        interface Crop {
            bounds: Vertex[];
            confidence: number;
        }
    
        interface Face {
            angles: {
                pan: number;
                roll: number;
                tilt: number;
            };
            bounds: {
                head: Vertex[];
                face: Vertex[];
                features: {
                    confidence: number;
                    chin: {
                        center: Vertex3;
                        left: Vertex3;
                        right: Vertex3;
                    };
                    ears: {
                        left: Vertex3;
                        right: Vertex3;
                    };
                    eyebrows: {
                        left: {
                            left: Vertex3;
                            right: Vertex3;
                            top: Vertex3;
                        };
                        right: {
                            left: Vertex3;
                            right: Vertex3;
                            top: Vertex3;
                        };
                    };
                    eyes: {
                        left: {
                            bottom: Vertex3;
                            center: Vertex3;
                            left: Vertex3;
                            pupil: Vertex3;
                            right: Vertex3;
                            top: Vertex3;
                        };
                        right: {
                            bottom: Vertex3;
                            center: Vertex3;
                            left: Vertex3;
                            pupil: Vertex3;
                            right: Vertex3;
                            top: Vertex3;
                        };
                    };
                    forhead: Vertex3;
                    lips: {
                        bottom: Vertex3;
                        top: Vertex3;
                    };
                    mouth: {
                        center: Vertex3;
                        left: Vertex3;
                        right: Vertex3;
                    };
                    nose: {
                        bottom: {
                            center: Vertex3;
                            left: Vertex3;
                            right: Vertex3;
                        };
                        tip: Vertex3;
                        top: Vertex3;
                    };
                };
                confidence: number;
                joy: boolean;
                sorrow: boolean;
                anger: boolean;
                surprise: boolean;
                underExposed: boolean;
                blurred: boolean;
                headwear: boolean;
            };
        }
    
        interface Label {
            desc: string;
            mid: string;
            score: number;
            confidence: number;
            locations: LatLng[];
            properties: Property[];
            bounds?: Vertex[];
        }
    
        interface Property {
            colors: ColorProperty[];
            
        }
        interface ColorProperty {
            score: number;
            hex: string;
            red: number;
            green: number;
            blue: number;
            coverage: number;
        }
    
        interface Similar {
            entities: string[];
            fullMatches: string[];
            partialMatches: string[];
            pages: string[];
        }
    
        interface Text {
            desc: string;
            bounds: Vertex[];
            confidence: number;
            locations: LatLng[];
            properties: any[];
        }
    
    
    
        interface File {
            name: string;
        }
        
        // https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#AnnotateImageRequest    
        interface AnnotateImageRequest {
            image: Image,
            features: Feature[],
            imageContext: ImageContext
        }
    
        // https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#AnnotateImageResponse
        interface AnnotateImageResponse {
            faceAnnotations: FaceAnnotation[],
            landmarkAnnotations: EntityAnnotation[],
            logoAnnotations: EntityAnnotation[],
            labelAnnotations: EntityAnnotation[],
            textAnnotations: EntityAnnotation[],
            safeSearchAnnotation: SafeSearchAnnotation,
            imagePropertiesAnnotation: ImageProperties,
            error: Status
        }
    
        interface DetectFacesOptions {
        }
        interface DetectFacesResponse {
        }
    
    
        
        // https://cloud.google.com/vision/docs/reference/rest/v1/images/annotate#ImageContext
        /** Image context and/or feature-specific parameters. */
        interface ImageContext {
            latLongRect: LatLongRect;
            languageHints: string[];
        }
        interface LatLng {
            latitude: number;
            longitude: number;
        }
        interface LatLongRect {
            minLatLng: LatLng;
            maxLatLng: LatLng;
        }
    
        interface DetectOptions {
            /** Image context and/or feature-specific parameters. */
            imageContext?: ImageContext;
            /** The maximum number of results, per type, to return in the response. */
            maxResults?: number;
            /** An array of feature types to detect from the provided images. */
            types?: FeatureTypes[];
            /** Use verbose mode, which returns a less-simplistic representation of the annotation (default: `false`). */
            verbose?: boolean;
        }
    
        interface Document {
            languages: string[];
            width: number;
            height: number;
            blocks: TextBlock[];
        }
    
        interface TextBlock {
            type: string;
            bounds: Vertex[];
            paragraphs?: TextSpan[];
        }
        interface TextSpan {
            bounds: Vertex[];
            text?: string;
            words?: TextSpan[];
            symbols?: TextSpan[];
        }
        
        /**
         * The source image(s) to run the detection on.
         * It can be either a local image path, a remote image URL, a Buffer, or a @google-cloud/storage File object.
         * */
        type ImageOptions = string|string[]|Buffer|Buffer[]|File|File[];
        
        type FeatureTypes = 'crops'|'document'|'faces'|'landmarks'|'labels'|'logos'|'properties'|'safeSearch'|'similar'|'text';
    }
}