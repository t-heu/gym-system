import Bee from 'bee-queue';
import MailRegistrationStore from '../app/jobs/MailRegistrationStore';
import MailRegistrationUpdate from '../app/jobs/MailRegistrationUpdate';
import MailHelpOrderAnswer from '../app/jobs/MailHelpOrderAnswer';
import redisConfig from '../config/redis';

const jobs = [
  MailHelpOrderAnswer,
  MailRegistrationStore,
  MailRegistrationUpdate,
];

class Queue {
  constructor() {
    this.queues = {};
    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }
  /**
  * queue é name
  * job é helpOrder: HelpOrder
  * recebe chave(key) e valor(value) e salva
  * 
  * bq:name:id: Inteiro, incrementado para determinar o próximo ID do trabalho.
  *   
  * bq:name:jobs: Hash do ID da tarefa para uma sequência JSON contendo seus dados e opções.
  *   
  * bq:name:waiting: Lista de IDs de trabalhos aguardando para serem processados.
  * 
  * bq:name:active: Lista de trabalhos de IDs atualmente em processamento.
  * 
  * bq:name:succeeded: Conjunto de IDs de trabalhos que foram bem sucedidos.
  */
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save()
  }

  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];
      bee.on('failed', this.handleFailure).process(handle)
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED: `, err);
  }
}

export default new Queue();
