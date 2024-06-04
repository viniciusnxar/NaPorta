import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from 'uniqid';

// Handler para o método POST
export async function POST(req) {
  // Extrai os dados do formulário da requisição
  const data = await req.formData();
  
  // Verifica se há um arquivo no formulário
  if (data.get('file')) {
    // Obtem o arquivo
    const file = data.get('file');

    // Configura o cliente S3 com as credenciais e região
    const s3Client = new S3Client({
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY,
        secretAccessKey: process.env.MY_AWS_SECRET_KEY,
      },
    });

    // Extrai a extensão do arquivo
    const ext = file.name.split('.').slice(-1)[0];
    // Gera um novo nome único para o arquivo
    const newFileName = uniqid() + '.' + ext;

    // Lê o arquivo em chunks e os concatena em um buffer
    const chunks = [];
    for await (const chunk of file.stream()) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    // Define o bucket onde o arquivo será armazenado
    const bucket = 'naporta-bucket';

    // Envia o comando para fazer upload do arquivo para o S3
    await s3Client.send(new PutObjectCommand({
      Bucket: bucket,
      Key: newFileName,
      ACL: 'public-read', // Define o arquivo como público
      ContentType: file.type, // Define o tipo de conteúdo do arquivo
      Body: buffer, // Corpo do arquivo
    }));

    // Gera o link público do arquivo no S3
    const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;
    // Retorna o link como resposta JSON
    return Response.json(link);
  }

  // Se nenhum arquivo for encontrado, retorna true
  return Response.json(true);
}
