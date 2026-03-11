package com.example.web.models;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.stream.Stream;

public class EmailNotification implements INotification{
    private PersonInformation personInformation;
    private OrderInformation orderInformation;
    private final JavaMailSenderImpl mailSender;
    public EmailNotification(){
        this.mailSender =  new JavaMailSenderImpl();
        EmailConfig emailConfig = new EmailConfig();

        mailSender.setHost(emailConfig.getEmailHost());
        mailSender.setPort(emailConfig.getEmailPort());
        mailSender.setUsername(emailConfig.getEmailUsername());
        mailSender.setPassword(emailConfig.getEmailPassword());

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        mailSender.setJavaMailProperties(props);
    }
    @Override
    public boolean send(String message) {
        try{
            EmailConfig emailConfig = new EmailConfig();
            List<EmailConfig> emailConfigs = new ArrayList<>();
            emailConfigs.add(emailConfig);
            emailConfigs.add(emailConfig);
            emailConfigs.add(emailConfig);
            Stream<EmailConfig> stream = emailConfigs.stream();
            Stream<EmailConfig> stream1 = stream.filter(x -> x.getEmailUsername().length() > 10);
            stream1.forEach(x -> System.out.println(x.getEmailHost()));
            Stream.Builder<EmailConfig> streeamBuilder = Stream.builder();
            streeamBuilder.add(emailConfig).add(emailConfig).add(emailConfig).add(emailConfig);
            Stream<EmailConfig> stream2 = streeamBuilder.build();
            Stream<String> stream3 = stream2.map(x -> x.getEmailHost());
            SimpleMailMessage email = new SimpleMailMessage();
            if (personInformation != null && orderInformation != null) {
                email.setTo(personInformation.getEmail());
                email.setSubject("Уведомление от системы бронирования");
                email.setText(message);

                mailSender.send(email);
                return true;
            }
            else {
                return false;
            }
        }
        catch (Exception e){
            System.out.println("Ошибка при отправке email: " + e.getMessage());
            return false;
        }
    }


    public boolean newOrderSend(Order order){
        String smtpUsername = mailSender.getUsername();
        String smtpName = "DonutShopInGrodno";
        String rootDir = System.getProperty("user.dir");
        String imagePath = rootDir + "/images/";
        return true;
    }


    public void setPersonInformation(PersonInformation personInformation) {
        this.personInformation = personInformation;
    }

    public void setOrderInformation(OrderInformation orderInformation) {
        this.orderInformation = orderInformation;
    }
}

