package com.example.web.services;

import com.example.web.models.EmailNotification;
import com.example.web.models.INotification;
import com.example.web.models.PersonInformation;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class NotificationService {
    public NotificationService(){}
    public void send(INotification iNotification, String message){
        iNotification.send(message);
    }
}
