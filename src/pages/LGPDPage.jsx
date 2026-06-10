import { Shield, Lock, Eye, Database, UserCheck, FileText, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const lgpdPrinciples = [
  { icon: <Shield className="w-6 h-6" />, title: 'Finalidade', desc: 'Seus dados são coletados apenas para finalidades específicas e legítimas.' },
  { icon: <Eye className="w-6 h-6" />, title: 'Transparência', desc: 'Informamos claramente quais dados coletamos e como os utilizamos.' },
  { icon: <Database className="w-6 h-6" />, title: 'Necessidade', desc: 'Coletamos apenas os dados mínimos necessários para nossos serviços.' },
  { icon: <Lock className="w-6 h-6" />, title: 'Segurança', desc: 'Implementamos medidas técnicas para proteger seus dados pessoais.' },
];

const userRights = [
  { icon: <UserCheck className="w-5 h-5" />, title: 'Acesso', desc: 'Você pode solicitar cópia de todos os seus dados armazenados.' },
  { icon: <FileText className="w-5 h-5" />, title: 'Correção', desc: 'Pode pedir retificação de dados incompletos, inexatos ou desatualizados.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Exclusão', desc: 'Pode solicitar eliminação de dados tratados com consentimento.' },
  { icon: <Eye className="w-5 h-5" />, title: 'Portabilidade', desc: 'Direito de receber seus dados em formato estruturado.' },
  { icon: <Lock className="w-5 h-5" />, title: 'Revogação', desc: 'Pode revogar seu consentimento a qualquer tempo.' },
];

export default function LGPDPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface px-4 py-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[400px] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 animate-fade-in">
        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => navigate('/')} className="btn-ghost p-2 -ml-2 text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Privacidade & LGPD</h1>
              <p className="text-white/50 text-sm">Lei Geral de Proteção de Dados (Lei 13.709/2018)</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 mb-8 border-primary/20 bg-gradient-to-r from-primary/10 to-transparent">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h2 className="font-bold text-lg mb-2">Nosso Compromisso com sua Privacidade</h2>
              <p className="text-white/70 text-sm leading-relaxed">
                O <strong>Raízes do Nordeste</strong> respeita sua privacidade e está em plena conformidade 
                com a Lei Geral de Proteção de Dados (LGPD). Seus dados pessoais são tratados com segurança, 
                transparência e apenas para as finalidades necessárias para oferecer a melhor experiência 
                em nossos serviços.
              </p>
            </div>
          </div>
        </div>

        {/* Princípios da LGPD */}
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            Princípios que Seguimos
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {lgpdPrinciples.map((item, i) => (
              <div key={i} className="glass-card p-5 border-surface-border/50 hover:border-primary/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                <p className="text-white/50 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-primary" />
            Quais Dados Coletamos
          </h2>
          <div className="glass-card p-6 border-surface-border/50 space-y-4">
            <div className="flex items-start gap-3 pb-4 border-b border-surface-border/30">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                <UserCheck className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white/90">Dados de Cadastro</h3>
                <p className="text-white/50 text-xs mt-0.5">Nome completo, e-mail e senha (criptografada). Utilizados para identificação e autenticação.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-4 border-b border-surface-border/30">
              <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center shrink-0">
                <FileText className="w-4 h-4 text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white/90">Dados de Pedidos</h3>
                <p className="text-white/50 text-xs mt-0.5">Histórico de compras, itens preferidos e unidade escolhida. Usados para processar pedidos e personalizar experiência.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-white/90">Dados de Navegação</h3>
                <p className="text-white/50 text-xs mt-0.5">Canal de acesso (Web/App/Totem) e interações no app. Utilizados para melhorar a usabilidade.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-primary" />
            Seus Direitos (Art. 18 da LGPD)
          </h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {userRights.map((item, i) => (
              <div key={i} className="glass-card p-4 border-surface-border/50 flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white/90">{item.title}</h3>
                  <p className="text-white/50 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            Como Exercer Seus Direitos
          </h2>
          <div className="glass-card p-6 border-surface-border/50">
            <p className="text-white/70 text-sm mb-4">
              Para solicitar acesso, correção, exclusão ou portabilidade dos seus dados, entre em contato 
              conosco através dos canais abaixo:
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary font-semibold">E-mail:</span>
                <span className="text-white/70">privacidade@raizesdonordeste.com.br</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary font-semibold">Telefone:</span>
                <span className="text-white/70">(89) 3000-1000 (Ramal 99)</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-primary font-semibold">Endereço:</span>
                <span className="text-white/70">Rua Cel. Lemos, 120 — Centro, Nossa Senhora de Nazaré/PI</span>
              </div>
            </div>
            <p className="text-white/40 text-xs mt-4">
              Prazo de resposta: até 15 dias úteis conforme determina a LGPD.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Base Legal para Tratamento
          </h2>
          <div className="glass-card p-6 border-surface-border/50 space-y-3">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm"><strong className="text-white">Consentimento:</strong> Para cadastro, newsletter e marketing.</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm"><strong className="text-white">Execução de Contrato:</strong> Para processar e entregar seus pedidos.</p>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
              <p className="text-white/70 text-sm"><strong className="text-white">Legítimo Interesse:</strong> Para melhoria contínua dos serviços e prevenção a fraudes.</p>
            </div>
          </div>
        </section>

        <div className="text-center py-8 border-t border-surface-border/30">
          <p className="text-white/40 text-xs mb-2">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
          <p className="text-white/30 text-xs">
            Esta política pode ser atualizada periodicamente. Recomendamos consulta regular.
          </p>
        </div>
      </div>
    </div>
  );
}
