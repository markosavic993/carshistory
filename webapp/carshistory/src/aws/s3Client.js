import AWS from 'aws-sdk';

const S3_BUCKET ='cars-history-images';
const REGION ='eu-central-1';


AWS.config.update({
  accessKeyId: '',
  secretAccessKey: ''
});


const bucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
});

export const uploadFile = async (file) => {

  const params = {
    ACL: 'public-read',
    Body: file,
    Bucket: S3_BUCKET,
    Key: file.name
  };

  try {
    return await bucket.putObject(params).promise();
  } catch (err) {
    console.log(err);
  }
}
